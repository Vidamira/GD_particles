let sphereRadius;
let sphereColor; // Preserved for potential future use
let textures; // Array to store texture filenames
let currentTextureIndex = 0; // Index to keep track of the current texture

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // properties
  sphereRadius = 150;
  sphereColor = color(255); // Not currently used

  // Define texture filenames
  textures = [
    "aquascape.jpg", 
    "gravel.jpg", 
    "stones.jpg",
    "universe.jpg",
    "dirt.jpg",
    "waves.jpg"
  ];

  for (let i = 0; i < textures.length; i++) {
    textures[i] = loadImage("textures/" + textures[i]);
  }

  // Create an array to store particles
  particleCount = 1200;
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
  background(0);
  orbitControl();
  push();
  rotateY(frameCount * 0.001);

  texture(textures[currentTextureIndex]);
  noStroke();
  sphere(sphereRadius);

  pop();

  //  particles 
  for (let i = 0; i < particles.length; i++) {
    particles[i].update(); 
    particles[i].draw(); 
  }
}

function changeSphereColorAndSizeResetParticles() {
  //random size for sphere
  sphereRadius = random(50, 250); 
  
  // Reset particle positions for a new arrangement
  for (let i = 0; i < particles.length; i++) {
    particles[i].reset(); // Assuming Particle class has a reset() method
  }

  // Change to the next texture in the array on button press
  currentTextureIndex++;
  if (currentTextureIndex >= textures.length) currentTextureIndex = 0; // Loop back to first texture
}
  
  // Particle class for managing individual stars
  class Particle {
    constructor() {
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