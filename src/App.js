import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import ErrorBoundary from "./components/ErrorBoundary";
import Register from "./components/Register/Register";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      apiResponse: null,
    };
  }

  calculateFaceLocation = (data) => {
    if (!data.outputs || !data.outputs[0].data.regions) {
      console.log("No faces detected.");
      this.setState({ boxes: [] });
      return;
    }

    const image = document.getElementById("inputimage");
    if (!image) return;

    const width = Number(image.width);
    const height = Number(image.height);

    const faces = data.outputs[0].data.regions.map((region) => {
      const clarifaiFace = region.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });

    this.setState({ boxes: faces });
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
  this.setState({ imageUrl: this.state.input });

  fetch("https://smart-brain-be-2lij.onrender.com/clarifai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageUrl: this.state.input }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        this.displayFaceBox(this.calculateFaceLocation(data));

        // ✅ Ensure user ID is valid before making a request
        if (this.props.user?.id) {
          fetch("https://smart-brain-be-2lij.onrender.com/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: this.props.user.id }),
          })
            .then((response) => response.json())
            .then((count) => {
              console.log("✅ Updated rank count:", count);
              this.props.user.entries = count;
              this.forceUpdate(); // Ensures UI updates
            })  

            .catch((error) => console.error("Error updating rank:", error));
        } else {
          console.error("🚨 User ID is missing in Home. Check if loadUser was called.");
        }
      }
    })
    .catch((error) => console.error("Error:", error));
};




  render() {
    return (
      <>
        <Navigation />
        <Logo />
        <Rank name={this.props.user.name} entries={this.props.user.entries} />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <ErrorBoundary>
          <FaceRecognition imageUrl={this.state.imageUrl} boxes={this.state.boxes} />
        </ErrorBoundary>
      </>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      particlesOptions: {
        background: { color: { value: "#000000" } },
        particles: {
          number: { value: 100 },
          size: { value: 3 },
          move: { enable: true, speed: 2 },
          links: { enable: true, color: "#ffffff" },
        },
      },
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  loadUser = (data) => {
  console.log("🔥 loadUser called with:", data); // Debugging log

  this.setState({ user: data }, () => {
    localStorage.setItem("user", JSON.stringify(data)); // ✅ Save user in local storage
  });


  if (!data || !data.id) {
    console.error("🚨 Invalid user data! Check backend response.");
    return;
  }

  this.setState(
    {
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    },
    () => {
      console.log("✅ User state updated:", this.state.user);
    }
  );
};


  async componentDidMount() {
    try {

      const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.setState({ user: JSON.parse(storedUser) });
    }
      
      const response = await fetch("https://smart-brain-be-2lij.onrender.com");
      const data = await response.json();
      console.log("Backend Response:", data);
    } catch (error) {
      console.error("Error fetching backend data:", error);
    }
  }

  async particlesInit(engine) {
    await loadSlim(engine);
  }

  render() {
    console.log("App.js User State:", this.state.user); // ✅ Debugging log
    return (
      <Router>
        <div className="App">
          <Particles
            id="tsparticles"
            init={this.particlesInit}
            options={this.state.particlesOptions}
            className="particles"
          />
          <Routes>
            <Route path="/" element={<Signin loadUser={this.loadUser} />} />
            <Route path="/home" element={<Home user={this.state.user} />} />
            <Route path="/register" element={<Register loadUser={this.loadUser} />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
