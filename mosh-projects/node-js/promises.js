//Task: To get customer from server. If customer has status "Gold" get top movies from another server
//and send its to the customers email. All async code emulated with setTimout

// Decision with Callbacks

getCustomer1(1, (customer) => {
  console.log("Customer: ", customer);
  if (customer.isGold) {
    getTopMovies1((movies) => {
      console.log("Top movies: ", movies);
      sendEmail1(customer.email, movies, () => {
        console.log("Email sent...");
      });
    });
  }
});

function getCustomer1(id, callback) {
  setTimeout(() => {
    callback({
      id: 1,
      name: "Alex",
      isGold: true,
      email: "email@mail.ru",
    });
  }, 4000);
}

function getTopMovies1(callback) {
  setTimeout(() => {
    callback(["movie1", "movie2"]);
  }, 4000);
}

function sendEmail1(email, movies, callback) {
  setTimeout(() => {
    callback();
  }, 4000);
}

// Decision with Await Async

async function sendMovies() {
  const user = await getCustomer(1);
  console.log("Customer", user);
  if (user.isGold) {
    const movies = await getTopMovies();
    console.log(movies);
    await sendEmail(user.email, movies);
    console.log("Email sent...", user.email);
  }
}

sendMovies();

// Decision with promises

p = getCustomer(1)
  .then((customer) => {
    console.log("Customer: ", customer);
    if (customer.isGold) return getTopMovies();
  })
  .then((movies) => {
    if (movies) {
      console.log("Top movies: ", movies);
      return movies;
    }
  });

p2 = getCustomer(1);

Promise.all([p, p2])
  .then((data) => {
    let [movies, customer] = data;
    if (movies) return sendEmail(customer.email, movies);
  })
  .then((data) => {
    let [email, movies] = data;
    console.log(`Movies ${movies} sent to customer ${email}`);
  });

//General functions for Async and Promises sections

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Alex",
        isGold: true,
        email: "email@mail.ru",
      });
    }, 2000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 2000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([email, movies]);
    }, 2000);
  });
}
