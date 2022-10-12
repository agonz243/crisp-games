title = "BREATHLESS";

description = `
 They mustn't hear!
   [hold] breath
`;

const G = {
	WIDTH: 120,
	HEIGHT: 50,
	MAX_ENEMIES: 1,
	CREATURE_SPEED_MIN: 0.1,
	CREATURE_SPEED_MAX: 3
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
`,`
 rrrr
rlbblr
 rrrr
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

// Define Player object and player container
/**
 * @typedef {{
 * pos: Vector,
 * speed: number
 * }} Creature
 */

/**
 * @type { Creature [] }
 */
let creatures;

let creaturePos; // For drawing sprite properly

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

		// Init creature
		creatures = [];

		creaturePos = vec(80, 20);
	}

	/**----------Update function START!----------**/

	// Draw player
	color("black");
	char('a', player.pos);

	// If mouseclick is held, hold breath
	if (pointer.isPressed) {
		// Play alert noise only once
		if (player.isBreathing) {
			play('select');
		}

		// Set breathing to false and change message
		player.isBreathing = false;
		breathMessage = "STILL";

		// Display exclamation above character
		color("black");
		char('b', vec(player.pos.x, player.pos.y - 7));
	}
	// Breathe on release
	if (pointer.isJustReleased) {

		// Set breathing back to true and change message
		player.isBreathing = true;
		breathMessage = "BREATHING";
	}

	// Display text to indicate if player is breathing
	text(`I'M ${breathMessage}`, 25, 45);



	// Spawn enemy
	remove(creatures, (c) => {
		// Make creatures fly towards player
		c.pos.x -= c.speed;

		// Draw creature
        color("black");
		draw_creature(c.pos);

		const isOutOfBounds = c.pos.x < -10;

        return isOutOfBounds;
    });
	// Spawn enemies
	if (creatures.length <= 0) {
        for (let i = 0; i < G.MAX_ENEMIES; i++) {
			const offset = rndi(120, 240);
			const posX = creaturePos.x + offset;
			const posY = creaturePos.y;
            creatures.push({ 
				pos: vec(posX, posY), 
				speed: rnd(G.CREATURE_SPEED_MIN, G.CREATURE_SPEED_MAX)
			})
        }
    }

}

// Helper function to draw all creature sprites
function draw_creature(pos) {
	// Draw left eye
	char('c', pos);

	// Draw right eye
	char('c', pos.x + 10, pos.y);
}
