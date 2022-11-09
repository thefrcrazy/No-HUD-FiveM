class GameHudComp {

  private hideWheel: any = undefined;

  private enumCompId: {
    [key: string]: number;
  } = {
    'WANTED_STARS': 1, 'WEAPON_ICON': 2, 'CASH': 3, 'MP_CASH': 4,
    'MP_MESSAGE': 5, 'VEHICLE_NAME': 6, 'AREA_NAME': 7, 'VEHICLE_CLASS': 8,
    'STREET_NAME': 9, 'HELP_TEXT': 10, 'FLOATING_HELP_TEXT_1': 11,
    'FLOATING_HELP_TEXT_2': 12, 'CASH_CHANGE': 13, 'RETICLE': 14,
    'SUBTITLE_TEXT': 15, 'RADIO_STATIONS': 16, 'SAVING_GAME': 17,
    'GAME_STREAM': 18, 'WEAPON_WHEEL': 19, 'WEAPON_WHEEL_STATS': 20,
    'HUD_COMPONENTS': 21, 'HUD_WEAPONS': 22
  }

  public EnableAll(editReticle?: boolean) {
    for (let i = 1; i <= 22; i++) {
      ResetHudComponentValues(i);
    }
    if (editReticle) this.DisableOne('reticle');
  }

  public DisableAll(editReticle?: boolean) {
    for (let i = 1; i <= 22; i++) {
      SetHudComponentPosition(i, -5.0, -5.0);
    }
    if (editReticle) this.EnableOne('reticle');
  }

  public EnableOne(id: string | number) {
    if (typeof id === 'string') id = this.enumCompId[id.toUpperCase()];
    ResetHudComponentValues(id);
  }

  public DisableOne(id: string | number) {
    if (typeof id === 'string') id = this.enumCompId[id.toUpperCase()];
    SetHudComponentPosition(id, -5.0, -5.0);
  }

  public ForceDisableWheel(state?: boolean) {
    if (state) {
      this.hideWheel = setInterval(() => {
        HudWeaponWheelIgnoreSelection();
        DisableControlAction(0, 37, true);
      }, 2);
    } else {
      clearInterval(this.hideWheel);
      this.hideWheel = undefined;
    }
  }

}

export const HudComp = new GameHudComp();



// EXAMPLE USAGE ONE

HudComp.EnableAll(false);
// HudComp.ForceDisableWheel(true);

setTimeout(() => {
  HudComp.DisableAll(true);
  HudComp.EnableOne(19);
  HudComp.EnableOne('WEAPON_WHEEL_STATS');
  // HudComp.ForceDisableWheel();
}, 4000);



// EXAMPLE USAGE TWO
HudComp.DisableAll(true);

HudComp.EnableOne(10);
HudComp.EnableOne(11);
HudComp.EnableOne(12);
HudComp.EnableOne('SUBTITLE_TEXT');
HudComp.EnableOne('RADIO_STATIONS');