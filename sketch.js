let sphereRadius;
let sphereColor;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // properties
  sphereRadius = 150;
  sphereColor = color(255);
  particleCount = 1200;
  

  // Create an array to store particles
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Create a button element with customizable text
  button = createButton('WARP');
  button.position(10, 10);
  button.mousePressed(changeSphereColorAndSizeResetParticles);
}

function draw() {
  background(0); // Set black background

  // Gradually decrease sphere radius (adjust shrinkRate as needed)
  sphereRadius -= 0.05;
  if (sphereRadius < 0) sphereRadius = 0; // Limit minimum radius (optional)

  // Rotate the sphere slightly around the Y axis
  orbitControl();

  // Update color and size on button press
  if (button.isPressed) {
    changeSphereColorAndSizeResetParticles();
  }

  // Draw the sphere
  push();
  rotateY(frameCount * 0.001); // Slow rotation
  fill(sphereColor); // Use the stored sphere color
  sphere(sphereRadius);
  pop();

  // Draw particles (stars)
  for (let i = 0; i < particles.length; i++) {
    particles[i].update(); // Update particle position/size
    particles[i].draw(); // Draw the particle
  }
}

function changeSphereColorAndSizeResetParticles() {
  // Generate a random color and size for the sphere
  sphereColor = color(random(255), random(255), random(255));
  sphereRadius = random(50, 250); // Random size within a range

  // Reset particle positions for a new arrangement
  for (let i = 0; i < particles.length; i++) {
    particles[i].reset(); // Assuming Particle class has a reset() method
  }
}
  
  // Particle class for managing individual stars
  class Particle {
    constructor() {
      // Random position within a 3D space
      this.x = random(-width / 2, width / 2);
      this.y = random(-height / 2, height / 2);
      this.z = random(width); // Depth variation
      this.opacity = random(10, 50);
        
      // Random size for the particle (star)
      this.size = random(1, 3);
      this.brightness = random(0, 1);
  
      // Pastel color for the particle (representing different stars)
      this.color = this.generatePastelStarColor();
  
      // Random opacity for the particle (0 - 255)
      this.opacity = random(50, 150); // Adjust opacity range as needed
    }
  
    update() {
      // Slight movement on Z axis for a twinkling effect
      this.z -= 1;
  
      // If particle goes beyond camera view, reposition it
      if (this.z < 0) {
        this.z = width;
        this.x = random(-width / 2, width / 2);
        this.y = random(-height / 2, height / 2);
        this.size = random(1, 3); // Update size for variety
        this.color = this.generatePastelStarColor(); // Update color for variety
      }

       // Randomly adjust brightness for twinkling effect
        this.brightness += random(-0.01, 0.02);
        this.brightness = constrain(this.brightness, 0, 1);
       

        
    }
  
    draw() {
        push();
        translate(this.x, this.y, this.z);
        fill(this.color, this.brightness * 255); // Use brightness for opacity
        noStroke();
        sphere(this.size);
        pop();
      }
  
    // New function to generate random pastel star color
    generatePastelStarColor() {
      const baseColor = floor(random(4)); // Choose base color (0-3)
      let pastelColor;
      switch (baseColor) {
        case 0:
          pastelColor = color(255, 235, 204, this.opacity); // Pastel yellow
          break;
        case 1:
          pastelColor = color(221, 160, 221, this.opacity); // Pastel violet
          break;
        case 2:
          pastelColor = color(144, 238, 144, this.opacity); // Pastel green
          break;
        case 3:
          pastelColor = color(240, 248, 255, this.opacity); // Pastel white
          break;
        default:
          pastelColor = color(200, 200, 200, this.opacity); // Default pastel gray
      }
      return pastelColor;
    }

    reset() {
        // Code to reset the particle's position and other properties
        this.x = random(-width / 2, width / 2);
        this.y = random(-height / 2, height / 2);
        this.z = random(width); // Depth variation
        this.size = random(1, 3); // Update size for variety
        this.color = this.generatePastelStarColor(); // Update color for variety
        this.opacity = random(10, 50); // Update opacity for variety
      }
  }