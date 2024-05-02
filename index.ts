import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("sportlink-team")
class SportlinkTeam extends LitElement {
  static styles = css`
    .grid {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      gap: var(--sportlink-team-grid-gap, 10px);   
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .grid-item {
      flex: 0 0 auto;
      width: 150px;      
      display: flex;
      flex-direction: column;
      justify-content: start;      

    }

    .grid-item svg {
      max-width: 100%;
    }

  `;

  @property()
  clientId?: string;

  @property()
  teamCode?: string;

   @property()
  loading: boolean = true;

  @property()
  error: boolean = false;

  data: any[] = [];

  URL = "https://data.sportlink.com/";

   private async getData(): Promise<any[]> {
    const url: URL = new URL(`${this.URL}/team-indeling`);
    url.searchParams.append("client_id", this.clientId as unknown as string);
    url.searchParams.append("teamcode", this.teamCode as unknown as string);
    url.searchParams.append("lokaleteamcode", "-1");
    url.searchParams.append("teampersoonrol", "ALLES");
    url.searchParams.append("toonlidfoto", "NEE");
    return await fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return new Error("error in call");
      }
    });
  }

  private async getMeta() {
    const metaEls = document.getElementsByTagName("meta");
    this.clientId =
      this.clientId !== undefined
        ? this.clientId
        : metaEls.namedItem("clientId")?.content;
    this.teamCode =
      this.teamCode !== undefined
        ? this.teamCode
        : metaEls.namedItem("teamCode")?.content;

    if (!this.clientId || !this.teamCode) {
      this.error = true;
    } else {
      this.data = await this.getData();
      this.loading = false;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.getMeta();
    this.dispatchEvent(new CustomEvent("connected"));
  }

  private renderImage () {
    return html`<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ccc" d="M 104.68731,56.689353 C 102.19435,80.640493 93.104981,97.26875 74.372196,97.26875 55.639402,97.26875 46.988823,82.308034 44.057005,57.289941 41.623314,34.938838 55.639402,15.800152 74.372196,15.800152 c 18.732785,0 32.451944,18.493971 30.315114,40.889201 z"/>
    <path fill="#ccc" d="M 92.5675 89.6048 C 90.79484 93.47893 89.39893 102.4504 94.86478 106.9039 C 103.9375 114.2963 106.7064 116.4723 118.3117 118.9462 C 144.0432 124.4314 141.6492 138.1543 146.5244 149.2206 L 4.268444 149.1023 C 8.472223 138.6518 6.505799 124.7812 32.40051 118.387 C 41.80992 116.0635 45.66513 113.8823 53.58659 107.0158 C 58.52744 102.7329 57.52583 93.99267 56.43084 89.26926 C 52.49275 88.83011 94.1739 88.14054 92.5675 89.6048 z"/>
  </svg>`
  }

  private renderTeam() {
    return html`
      <h2>Spelers</h2>
      <ul class="team grid">
        ${this.data.map((member) => {
          return member.rol === "Teamspeler" ?
          html`
            <li class="grid-item">
              <div>
                ${this.renderImage()}
              </div>
              <div class="naam">
                ${member.naam}
              </div>
              <div class="functie">
                ${member.functie}
              </div>
            </li>
          ` : null 
        })}
      </ul>
    `
  }

  private renderStaff() {
    return html`
      <h2>Staff</h2>
      <ul class="staf grid">
      ${this.data.map((member) => {
        return member.rol !== "Teamspeler" ?
        html`
          <li class="grid-item">
            <div>
              ${this.renderImage()}
            </div>
            <div class="naam">
              ${member.naam}
            </div>
            <div class="functie">
              ${member.functie}
            </div>
          </li>
        ` : null 
      })}
        </ul>
    `
  }

  render(): TemplateResult {
    return this.error
      ? html`<div>Er is helaas iets misgegaan</div>`
      : this.loading
        ? html` <div>loading</div>`
        : html`<div class="team-main">        
            ${this.renderTeam()}         
            ${this.renderStaff()}
          
        </div>
        `
  }
}
