import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("sportlink-team")
class SportlinkTeam extends LitElement {
  static styles = css`
    
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

  private renderTeam() {
    return html`
      <ul class="team">
        <h2>Spelers</h2>
        ${this.data.map((member) => {
          return html`
            <li>
              <div>
                ${member.naam}
              </div>
            </li>
          `
        })}
        <ul>
    `
  }

  private renderStaff() {
    return html`
      <ul class="staf">
      <h2>Staff</h2>
        ${this.data.map((member) => {
          return html`
            <li>
              <div>

              </div>
            </li>
          `
        })}
        <ul>
    `
  }

  render(): TemplateResult {
    return this.error
      ? html`<div>Er is helaas iets misgegaan</div>`
      : this.loading
        ? html` <div>loading</div>`
        : html`<div class="team-main">
          <div>
            ${this.renderTeam()}
          </div>
          <div>
            ${this.renderStaff()}
          </div>
        </div>
        `
  }
}
