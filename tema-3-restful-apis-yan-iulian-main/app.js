const express = require("express");
const { Restaurant, Address, MenuItem, initDb } = require("./db");

const app = express();
app.use(express.json());

function bodyLipseste(body) {
  const esteUndefinedSauNull = body === undefined || body === null;
  const esteObiectGol = typeof body === "object" && Object.keys(body).length === 0;
  return esteUndefinedSauNull || esteObiectGol;
}

function areProprietatiObligatorii(body, proprietatiObligatorii) {
  for (const proprietate of proprietatiObligatorii) {
    const existaProprietate = body.hasOwnProperty(proprietate);
    if (!existaProprietate) {
      return false;
    }
  }
  return true;
}

function ratingValid(valoare) {
  const esteNumar = typeof valoare === "number";
  const esteIntreg = Number.isInteger(valoare);
  const esteInInterval = valoare >= 1 && valoare <= 5;
  return esteNumar && esteIntreg && esteInInterval;
}

function pretValid(valoare) {
  const esteNumar = typeof valoare === "number";
  const estePozitiv = valoare > 0;
  return esteNumar && estePozitiv;
}

function stringNevid(valoare) {
  const esteString = typeof valoare === "string";
  if (!esteString) return false;
  const textFaraSpatii = valoare.trim();
  const areCaractere = textFaraSpatii.length > 0;
  return areCaractere;
}

// ----------------------------
// POST /restaurants
// ----------------------------
app.post("/restaurants", async (req, res) => {
  const body = req.body;

  const bodyEsteAbsent = bodyLipseste(body);
  if (bodyEsteAbsent) {
    return res.status(400).json({ message: "body is missing" });
  }

  const proprietatiNecesare = ["name", "rating"];
  const areToateProprietatile = areProprietatiObligatorii(body, proprietatiNecesare);
  if (!areToateProprietatile) {
    return res.status(400).json({ message: "malformed request" });
  }

  const ratingEsteValid = ratingValid(body.rating);
  if (!ratingEsteValid) {
    return res.status(400).json({ message: "rating should be between 1 and 5" });
  }

  try {
    const restaurantNou = await Restaurant.create({
      name: body.name,
      rating: body.rating,
    });
    return res.status(201).json({ message: "created" });
  } catch (eroare) {
    return res.status(500).json({ message: "internal server error" });
  }
});

// ----------------------------
// PUT /restaurants/:restaurantId
// ----------------------------
app.put("/restaurants/:restaurantId", async (req, res) => {
  const body = req.body;
  const idRestaurant = parseInt(req.params.restaurantId, 10);

  const bodyEsteAbsent = bodyLipseste(body);
  if (bodyEsteAbsent) {
    return res.status(400).json({ message: "body is missing" });
  }

  const proprietatiNecesare = ["name", "rating"];
  const areToateProprietatile = areProprietatiObligatorii(body, proprietatiNecesare);
  if (!areToateProprietatile) {
    return res.status(400).json({ message: "malformed request" });
  }

  const ratingEsteValid = ratingValid(body.rating);
  if (!ratingEsteValid) {
    return res.status(400).json({ message: "rating should be between 1 and 5" });
  }

  try {
    const restaurantGasit = await Restaurant.findByPk(idRestaurant);
    const restaurantExista = restaurantGasit !== null;
    if (!restaurantExista) {
      return res.status(404).json({ message: "restaurant not found" });
    }
    restaurantGasit.name = body.name;
    restaurantGasit.rating = body.rating;
    await restaurantGasit.save();
    return res.status(200).json({ message: "updated" });
  } catch (eroare) {
    return res.status(500).json({ message: "internal server error" });
  }
});

// ----------------------------
// POST /restaurants/:restaurantId/address
// ----------------------------
app.post("/restaurants/:restaurantId/address", async (req, res) => {
  const body = req.body;
  const idRestaurant = parseInt(req.params.restaurantId, 10);

  const bodyEsteAbsent = bodyLipseste(body);
  if (bodyEsteAbsent) {
    return res.status(400).json({ message: "body is missing" });
  }

  const proprietatiNecesare = ["street", "city"];
  const areToateProprietatile = areProprietatiObligatorii(body, proprietatiNecesare);
  if (!areToateProprietatile) {
    return res.status(400).json({ message: "malformed request" });
  }

  const stradaEsteValida = stringNevid(body.street);
  if (!stradaEsteValida) {
    return res.status(400).json({ message: "street should not be empty" });
  }

  try {
    const restaurantGasit = await Restaurant.findByPk(idRestaurant);
    const restaurantExista = restaurantGasit !== null;
    if (!restaurantExista) {
      return res.status(404).json({ message: "restaurant not found" });
    }

    const adresaExistenta = await Address.findOne({
      where: { restaurantId: idRestaurant },
    });

    if (adresaExistenta) {
      adresaExistenta.street = body.street;
      adresaExistenta.city = body.city;
      await adresaExistenta.save();
    } else {
      await Address.create({
        street: body.street,
        city: body.city,
        restaurantId: idRestaurant,
      });
    }
    return res.status(201).json({ message: "created" });
  } catch (eroare) {
    return res.status(500).json({ message: "internal server error" });
  }
});

// ----------------------------
// POST /restaurants/:restaurantId/menu-items
// ----------------------------
app.post("/restaurants/:restaurantId/menu-items", async (req, res) => {
  const body = req.body;
  const idRestaurant = parseInt(req.params.restaurantId, 10);

  const bodyEsteAbsent = bodyLipseste(body);
  if (bodyEsteAbsent) {
    return res.status(400).json({ message: "body is missing" });
  }

  const proprietatiNecesare = ["name", "price"];
  const areToateProprietatile = areProprietatiObligatorii(body, proprietatiNecesare);
  if (!areToateProprietatile) {
    return res.status(400).json({ message: "malformed request" });
  }

  const pretulEsteValid = pretValid(body.price);
  if (!pretulEsteValid) {
    return res.status(400).json({ message: "price should be a positive number" });
  }

  try {
    const restaurantGasit = await Restaurant.findByPk(idRestaurant);
    const restaurantExista = restaurantGasit !== null;
    if (!restaurantExista) {
      return res.status(404).json({ message: "restaurant not found" });
    }

    const elementMeniuNou = await MenuItem.create({
      name: body.name,
      price: body.price,
      restaurantId: idRestaurant,
    });
    return res.status(201).json({ message: "created" });
  } catch (eroare) {
    return res.status(500).json({ message: "internal server error" });
  }
});

// ----------------------------
// DELETE /restaurants/:restaurantId/menu-items/:menuItemId
// ----------------------------
app.delete("/restaurants/:restaurantId/menu-items/:menuItemId", async (req, res) => {
  const idRestaurant = parseInt(req.params.restaurantId, 10);
  const idElementMeniu = parseInt(req.params.menuItemId, 10);

  try {
    const elementGasit = await MenuItem.findOne({
      where: {
        id: idElementMeniu,
        restaurantId: idRestaurant,
      },
    });

    const elementExista = elementGasit !== null;
    if (!elementExista) {
      return res.status(404).json({ message: "menu item not found" });
    }

    await elementGasit.destroy();
    return res.status(200).json({ message: "deleted" });
  } catch (eroare) {
    return res.status(500).json({ message: "internal server error" });
  }
});

// ----------------------------
// DELETE /restaurants/:restaurantId
// ----------------------------
app.delete("/restaurants/:restaurantId", async (req, res) => {
  const idRestaurant = parseInt(req.params.restaurantId, 10);

  try {
    const restaurantGasit = await Restaurant.findByPk(idRestaurant);
    const restaurantExista = restaurantGasit !== null;
    if (!restaurantExista) {
      return res.status(404).json({ message: "restaurant not found" });
    }

    await restaurantGasit.destroy();
    return res.status(200).json({ message: "deleted" });
  } catch (eroare) {
    return res.status(500).json({ message: "internal server error" });
  }
});

// ----------------------------
// GET /restaurants (supports sortField, sortOrder)
// ----------------------------
app.get("/restaurants", async (req, res) => {
  try {
    const campSortare = req.query.sortField;
    const directieSortare = req.query.sortOrder;

    const optiuniQuery = {
      include: [
        { model: Address, as: "address" },
        { model: MenuItem, as: "menuItems" },
      ],
    };

    const existaSortare = campSortare !== undefined;
    if (existaSortare) {
      const directie = directieSortare === "desc" ? "DESC" : "ASC";
      optiuniQuery.order = [[campSortare, directie]];
    }

    const listaRestaurante = await Restaurant.findAll(optiuniQuery);

    const restauranteFormatate = listaRestaurante.map((restaurant) => {
      const dateRestaurant = restaurant.toJSON();

      if (dateRestaurant.address) {
        const adresaOriginala = dateRestaurant.address;
        dateRestaurant.address = {
          street: adresaOriginala.street,
          city: adresaOriginala.city,
        };
      }

      if (dateRestaurant.menuItems) {
        dateRestaurant.menuItems = dateRestaurant.menuItems.map((element) => ({
          id: element.id,
          name: element.name,
          price: element.price,
        }));
      }

      return {
        id: dateRestaurant.id,
        name: dateRestaurant.name,
        rating: dateRestaurant.rating,
        address: dateRestaurant.address || null,
        menuItems: dateRestaurant.menuItems || [],
      };
    });

    return res.status(200).json(restauranteFormatate);
  } catch (eroare) {
    return res.status(500).json({ message: "internal server error" });
  }
});

module.exports = app;