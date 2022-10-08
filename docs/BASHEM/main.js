title = "BASH 'EM";

description = `
 Defend your walls!
`;

characters = [
`
  ll  
llccll
llccll
  ll
`,`
  rr
 r  r
  rr
`
];

// Declare global use variables for easy access
const G = {
	WIDTH: 125,
	HEIGHT: 125,
	RETICLE_OFFSET: 20,
	ROTATION_RATE: 3,
	PLAYER_SPEED: 20
}

// Set game options
options = {
	viewSize: {x: G.HEIGHT, y: G.WIDTH},
	seed: 2,
    isPlayingBgm: true,
	theme: "dark"
};

// Define Player object and player container
/**
 * @typedef {{
 * pos: Vector
 * isMoving: boolean
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

// Define Player object and player container
/**
 * @typedef {{
 * pos: Vector
 * }} Launcher
 */

/**
 * @type { Launcher }
 */
let launcher;


function update() {
	/**----------Init function START!----------**/

	if (!ticks) {
		// Init player
		player = {
			pos: vec(G.WIDTH/2, G.HEIGHT - G.HEIGHT/4),
			isMoving: false
		}

		// Init launch trajectory reticle
		launcher = {
			pos: vec(player.pos.x, player.pos.y - G.RETICLE_OFFSET),
		}
	}

	/**----------Update function START!----------**/

	
	// Add launcher reticle
	if (!player.isMoving) {
		//launcher.pos = vec(player.pos.x, player.pos.y - G.RETICLE_OFFSET);
		color("black");
		char("b", launcher.pos);
		launcher.pos = rotate(player.pos.x, player.pos.y, launcher.pos.x, launcher.pos.y, G.ROTATION_RATE)
	}

	// Update and draw player
	char("a", player.pos);
	player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
	color("black");

	// Move player on left click 
	if (pointer.isJustPressed) {
		player.isMoving = true;
		play("powerUp");
		// Move player to launcher point
		for (let i = 0; i < G.PLAYER_SPEED; i++) {
			player.pos.x += 3 * Math.cos(player.pos.angleTo(launcher.pos));
			player.pos.y += 3 * Math.sin(player.pos.angleTo(launcher.pos));
			char("a", player.pos); // Redraw player for teleport effect
			
		}
		// Reset reticle position
		launcher.pos = vec(player.pos.x, player.pos.y - G.RETICLE_OFFSET);
		player.isMoving = false; 
	}
}

// Function to rotate a point about an origin
function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return vec(nx, ny);
}
