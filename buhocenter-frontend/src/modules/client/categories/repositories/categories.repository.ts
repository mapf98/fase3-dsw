import { HttpRepository } from "@/http/http.repository";
import { Categories } from "../interfaces/categories.interface";

class CategoriesHttpRepository extends HttpRepository {
  private static readonly RESOURCE = "categories";

  public getCategories(): Promise<Categories> {
    return this.get(this.createUri([`${CategoriesHttpRepository.RESOURCE}`]));
  }
}

export default new CategoriesHttpRepository();
