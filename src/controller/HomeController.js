class HomeController {
  async index(req, res) {
    res.json(`index ${req.originalUrl}`);
  }
}

export default new HomeController();
