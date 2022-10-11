title = "BREATHLESS";

description = `
 They mustn't hear!
   [hold] breath
`;

const G = {
	WIDTH: 120,
	HEIGHT: 50,
}


characters = [
`
  ll
  ll
llccll
  cc
ll  ll
`, `
RRR
RRR
 R

 R
`
];

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
	seed: 4,
    isPlayingBgm: true,
	theme: "crt"
};

// Define Player object and player container
/**
 * @typedef {{
 * pos: Vector
 * isBreathing: boolean
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

// Define message that indicates if player is breathing
let breathMessage;

function update() {
	/**----------Init function START!----------**/
	
	if (!ticks) {
		// Init player
		player = {
			pos: vec(10, G.HEIGHT - 6),
			isBreathing: true
		}

		breathMessage = "BREATHING"
	}

	/**----------Update function START!----------**/

	// Draw player
	color("black");
	char('a', player.pos);

	// If mouseclick is held, hold breath
	if (pointer.isPressed) {
		console.log("HOLDING");

		// Set breathing to false and change message
		player.isBreathing = false;
		breathMessage = "STILL";

		// Display exclamation above character
		color("black");
		char('b', vec(player.pos.x, player.pos.y - 7));
	}
	// Play noise once, not while holding breath
	if (pointer.isJustPressed) {
		// Play noise!
		play("select");
	}
	// Breathe on release
	if (pointer.isJustReleased) {
		console.log("BREATHING");

		// Set breathing back to true and change message
		player.isBreathing = true;
		breathMessage = "BREATHING";
	}

	// Display text to indicate if player is breathing
	text(`I'M ${breathMessage}`, 25, 45);
}
