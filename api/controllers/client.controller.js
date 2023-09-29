//------MEMORY---------
export const dataClients = [];
//---------------------

export const getAllClients = async (req, res) => {
  try {
    const clients = dataClients;
    if (clients.length === 0) res.status(204).send();
    else res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ error: "No clients found" });
  }
};

export const createClient = async (req, res) => {
  const { name, lastname, dni } = req.body;
  const dniExists = dataClients.findIndex((p) => p.dni === dni);

  try {
    const dniRegex = /^\d{8,}$/;

    if (dniExists !== -1) {
      res
        .status(403)
        .send({ message: "Client cannot be created, DNI already registered" });
    } else if (name == null || lastname == null || dni == null) {
      res.status(403).send({ message: "Name, Lastname or dni cannot be null" });
    } else if (!dniRegex.test(dni)) {
      res.status(403).send({
        message: "DNI must be numeric and must contain at least 8 digits",
      });
    } else {
      const newClient = {
        dni: dni,
        name,
        lastname,
      };

      dataClients.push(newClient);
      res
        .status(201)
        .send({ message: `Client ${name} created successfully!`, newClient });
    }
  } catch (error) {
    res.status(403).send();
  }
};

export const getOneClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = dataClients.find((p) => p.dni === Number(id));
    if (!client) {
      res.status(404).send({ message: "Client not founded" });
    } else {
      res.status(200).json(client);
    }
  } catch (error) {
    res.status(404).send();
  }
};

export const updateClient = async (req, res) => {
  const { id } = req.params;
  const { name, lastname } = req.body;

  try {
    const clientIndex = dataClients.findIndex((p) => p.dni === Number(id));
    if (clientIndex === -1) {
      res.status(404).send({ message: "Client not founded" });
    } else {
      dataClients[clientIndex] = {
        dni: dataClients[clientIndex].dni,
        name: name || dataClients[clientIndex].name,
        lastname: lastname || dataClients[clientIndex].lastname,
      };

      res
        .status(200)
        .json({ message: "success", client: dataClients[clientIndex] });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const clientIndex = dataClients.findIndex((p) => p.dni === Number(id));
    if (clientIndex === -1) {
      res.status(404).send({ message: "Client not founded" });
    } else {
      dataClients.splice(clientIndex, 1);
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
