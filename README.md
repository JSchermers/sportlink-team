## General component for showing sportlink team members

It is a webcomponent for displaying team members from a football club.

### meta
`<meta name="teamCode" content="[yourcontent]" />`
`<meta name="clientId" content="[yourcontent]" />`

### property
`<sportlink-team clientId="[yourcontent]" teamCode="[yourcontent]"></sportlink-team>`


### Properties

| Property    | Value |
| -------- | ------- |
| clientId  | [your_id] |
| teamCode  | [your_id] |



### css vars

| Property    | Default Value |
| -------- | ------- |
| --sportlink-team-grid-gap | 1em |
| --background-sportlink-team-card | none |
| --background-sportlink-team-card-border-radius | 0 |
| --padding-block-sportlink-team-name-player | 0 |
| --padding-inline-sportlink-team-name-player | 0 |
| --padding-inline-sportlink-team-name-player-textcolor | inherit |
| --padding-block-sportlink-team-name-staff | 0 |
| --padding-inline-sportlink-team-name-staff | 0 |
| --padding-inline-sportlink-team-name-staff-textcolor | inherit |


### SLOTTED

| SLOTName | Position |
| slot="players" | Title above the players |
| slot="staff" | Title above the staff |


### This component is in beta mode and not production ready
