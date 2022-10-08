title = "JOUST";

description = `
 Defend your walls!
`;

characters = [
`
  ll  
llccll
llccll
  ll
`
];

// Declare global use variables for easy access
const G = {
	WIDTH: 125,
	HEIGHT: 125,
	LINE_OFFSET: 5,
	ROTATION_RATE: .05
}

// Set game options
options = {
	viewSize: {x: G.HEIGHT, y: G.WIDTH},
	seed: 1,
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
 * x: number,
 * y: number,
 * rotate: number
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

		// Init launch trajectory line
		launcher = {
			x: player.pos.x,
			y: player.pos.y,
			rotate: 3
		}
	}

	/**----------Update function START!----------**/

	
	// Add trajectory line
	if (!player.isMoving) {
		bar(launcher.x, launcher.y, 10, 1.5, launcher.rotate, 1)
		launcher.rotate += G.ROTATION_RATE;
	}

	// Update and draw player
	char("a", player.pos);
	player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
	color("black");

	// Move player on left click 
	if (pointer.isJustPressed) {
		player.isMoving = true;
		// Move player to tip of trajectory line
		player.isMoving = false; 
	}
}
