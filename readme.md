# Arkapong

An Arkanoid and Pong mashup built in Phaser 3 for learning purposes. The project is built using Typescript.



## Wish List

- [x] Particle explosion on rectangle destroy.
- [X] Calculate a score (+X points for destroying a brick / -Y if ball goes out of screen)
    - [x] Spawn a concurrent HUD scene
    - [x] Increment score on brick collision
    - [x] Decrement score on ball miss
- [x] Build a HUD using a concurrent scene, using some mechanism to share state between them.
- [x] Implement second player IA (just follow ball on first release)
- [x] Deploy so it can be accessed
- [x] Use an object pool to spawn multiple balls.
- [ ] Add pause menu
    - [ ] Think how to open a pause menu on mobile
- [ ] Rethink how the bricks appear
    - [ ] Randomize initial obstacles, leaving some empty spaces
    - [ ] Make bricks spawn again every once in a while
- [ ] Solve "infinite game" thingy
    - [ ] Limit ball misses before ending game
    - [ ] Time trial mode
- [ ] Add sound
    - [ ] Add background music
    - [ ] Add sound on brick collision
    - [ ] Add dramatic sound on ball miss
- [ ] Implement online multiplayer.
- [ ] Graphical overhaul