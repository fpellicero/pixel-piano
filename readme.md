# Arkapong

An Arkanoid and Pong mashup built in Phaser 3 for learning purposes. The project is built using Typescript.



## Wish List

- [x] Particle explosion on rectangle destroy.
- [ ] Calculate a score (+X points for destroying a brick / -Y if ball goes out of screen)
    - [x] Spawn a concurrent HUD scene
    - [x] Increment score on brick collision
    - [ ] Decrement score on ball miss
- [x] Build a HUD using a concurrent scene, using some mechanism to share state between them.
- [ ] Implement second player IA (just follow ball on first release)
- [ ] Deploy so it can be accessed
- [x] Use an object pool to spawn multiple balls.
- [ ] Implement online multiplayer.
- [ ] Graphical overhaul