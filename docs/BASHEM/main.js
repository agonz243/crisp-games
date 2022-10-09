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
`, `
y    y
 yRRy
y    y
`
];

// Declare global use variables for easy access
const G = {
	WIDTH: 125,
	HEIGHT: 125,
	RETICLE_OFFSET: 20,
	ROTATION_RATE: 3,
	PLAYER_SPEED: 20,
	ENEMY_SPEED: 0.05,
	MAX_ENEMIES: 3,
}

// Set game options
options = {
	viewSize: {x: G.HEIGHT, y: G.WIDTH},
	seed: 2,
    isPlayingBgm: true,
	theme: "crt"
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

// Define enemy object and enemy container
/**
 * @typedef {{
 * pos: Vector,
 * angle: number
 * }} Enemy
 */

/**
 * @type { Enemy [] }
 */
let enemies;

// Define wave count to keep track of score
/**
 * @type { number }
 */
 let waveCount;

 // Define life count to keep track of health
/**
 * @type { number }
 */
 let playerLives;


function update() {
	/**----------Init function START!----------**/

	if (!ticks) {
		// Init player and lives
		player = {
			pos: vec(G.WIDTH/2, G.HEIGHT - G.HEIGHT/4),
			isMoving: false
		}
		playerLives = 3;

		// Init launch trajectory reticle
		launcher = {
			pos: vec(player.pos.x, player.pos.y - G.RETICLE_OFFSET),
		}

		// Init enemies and wave count
		enemies = [];
		waveCount = 0;
	}

	/**----------Update function START!----------**/

	// Display lives on screen, end game if the player drops below 0
	text(`Lives:${playerLives}`, 5, 120);
	if (playerLives <= 0) {
		end();
	}

	// Add launcher reticle
	if (!player.isMoving) {
		color("black");
		char("b", launcher.pos);
		launcher.pos = rotate(player.pos.x, player.pos.y, launcher.pos.x, launcher.pos.y, G.ROTATION_RATE * difficulty)
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

	// Draw enemy spawn zone
	color("yellow");
	// Kill player if they touch the spawn zone!
	if (box(G.HEIGHT/2, G.WIDTH/2, 6, 6).isColliding.char.a) {
		play("explosion");
		end();
	}

	// Update enemies and remove them when necessary
	remove(enemies, (e) => {
        e.pos.addWithAngle(e.angle, G.ENEMY_SPEED * difficulty);
        color("black");

		const isCollidingWithPlayer = char("c", e.pos).isColliding.char.a;
		const isOutOfBounds = !e.pos.isInRect(0, 0, G.WIDTH, G.HEIGHT);

		// On collision, play sound and add to score
		if (isCollidingWithPlayer) { 
			play("coin");
			addScore(10 * waveCount, e.pos)
		}

		// If enemy escapes, play sound and decrease lives
		if (isOutOfBounds) {
			play("select");
			// Decrement lives
			playerLives--
		}

        return (isCollidingWithPlayer || isOutOfBounds);
    });
	// Spawn enemies
	if (enemies.length === 0) {
        for (let i = 0; i < G.MAX_ENEMIES * difficulty; i++) {
            const posX = G.WIDTH/2;
            const posY = G.HEIGHT/2;
            enemies.push({ pos: vec(posX, posY), angle: rnd(0, 360)})
        }

		waveCount++ // Increment wave count
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
