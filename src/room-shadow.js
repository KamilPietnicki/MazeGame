/**
 * A small helper class that can take control of our shadow tilemap layer. It keeps track of which
 * room is currently active.
 */
export default class RoomVisability {
    constructor(shadowLayer) {
      this.shadowLayer = shadowLayer;
      this.activeRoom = null;
    }
  
    setActiveRoom(room) {
      if (room !== this.activeRoom) {
        this.setRoomAlpha(room, 0); // Make the new room visible
        if (this.activeRoom) this.setRoomAlpha(this.activeRoom, 1); // Dim the old room
        this.activeRoom = room;
      }
    }
  
    setRoomAlpha(room, alpha) {
      this.shadowLayer.forEachTile(
        t => (t.alpha = alpha),
        this,
        room.x,
        room.y,
        room.width,
        room.height
      );
    }
  }
  