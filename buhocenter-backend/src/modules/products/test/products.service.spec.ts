import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { WinstonModule } from 'nest-winston';

import { Product } from '../entities/product.entity';
import { ProductInventory } from '../entities/product-inventory.entity';
import { ProductDimension } from '../entities/product-dimension.entity';
import { Offer } from '../entities/offer.entity';
import { ProductPhoto } from '../entities/product-photo.entity';
import { ProductQuestion } from '../entities/product-question.entity';
import { ProductRating } from '../entities/product-rating.entity';

import { ProductsService } from '../services/products.service';
import { LoggerSettingsService } from '../../settings/services/logger.service';
import { StatusService } from '../../status/services/status.service';
import { BrandsService } from '../services/brands.service';
import { CategoriesService } from '../services/categories.service';
import { UsersService } from '../../users/services/users.service';
import { create } from 'domain';

describe('Products Service', () => {
  let productService: ProductsService;

  let RepositoryMock: jest.Mock;
  let productRepository: Repository<Product>;
  let productRatingsRepository: Repository<ProductRating>;
  let productInventoriesRepository: Repository<ProductInventory>;
  let productDimensionRepository: Repository<ProductDimension>;
  let offerRepository: Repository<Offer>;
  let productPhotoRepository: Repository<ProductPhoto>;
  let productQuestionRepository: Repository<ProductQuestion>;

  let StatusServiceMock: jest.Mock<Partial<StatusService>>;
  let statusService: StatusService;

  let BrandsServiceMock: jest.Mock<Partial<BrandsService>>;
  let brandsService: BrandsService;

  let CategoriesServiceMock: jest.Mock<Partial<CategoriesService>>;
  let categoriesService: CategoriesService;

  let UsersServiceMock: jest.Mock<Partial<UsersService>>;
  let usersService: UsersService;

  let getMany: jest.Mock;
  let getCount: jest.Mock;
  let skip: jest.Mock;
  let andWhere: jest.Mock;
  let take: jest.Mock;

  let productExample = {
    name: "iPhone X",
    description: "Brand new",
    canAccumulatePoits: false,
    price: 800,
    fragile: true,
    status: {
        id: 1
    },
    brand: {
        id: 1
    },
    provider: {
        id: 1
    },
    productDimension: {
        width: 2,
        height: 2,
        long: 2,
        weight: 2,
        createdAt: '2020-08-08T00:32:42.350Z',
        updatedAt: '2020-08-08T00:32:42.350Z',
        id: 58
    },
    productInventory: {
        availableQuantity: 20,
        minimumAvailableQuantity: 2,
        createdAt: '2020-08-08T00:32:42.350Z',
        updatedAt: '2020-08-08T00:32:42.350Z',
        id: 58
    },
    productCatalogues: [
        {
            catalogue: {
                id: 1
            },
            createdAt: '2020-08-08T00:32:42.350Z',
            updatedAt: '2020-08-08T00:32:42.350Z',
            id: 58
        },
        {
            catalogue: {
                id: 2
            },
            createdAt: '2020-08-08T00:32:42.350Z',
            updatedAt: '2020-08-08T00:32:42.350Z',
            id: 59
        }
    ],
    productPhotos: [
        {
            content: 'iphonephoto1',
            createdAt: '2020-08-08T00:32:42.350Z',
            updatedAt: '2020-08-08T00:32:42.350Z',
            id: 97
        },
        {
            content: 'iphonephoto2',
            createdAt: '2020-08-08T00:32:42.350Z',
            updatedAt: '2020-08-08T00:32:42.350Z',
            id: 98
        },
        {
            content: 'iphonephoto3',
            createdAt: '2020-08-08T00:32:42.350Z',
            updatedAt: '2020-08-08T00:32:42.350Z',
            id: 99
        }
    ],
    createdAt: '2020-08-08T00:32:42.350Z',
    updatedAt: '2020-08-08T00:32:42.350Z',
    canAccumulatePoints: null,
    id: 58,
    rating: '0'
  };

  beforeEach(() => {

    let select = jest.fn().mockReturnThis();
    let addSelect = jest.fn().mockReturnThis();
    let innerJoinAndSelect = jest.fn().mockReturnThis();
    let leftJoinAndSelect = jest.fn().mockReturnThis();
    let distinct = jest.fn().mockReturnThis();
    let leftJoin = jest.fn().mockReturnThis();
    let where = jest.fn().mockReturnThis();
    andWhere = jest.fn().mockReturnThis();
    skip = jest.fn().mockReturnThis();
    take = jest.fn().mockReturnThis();
    getMany = jest.fn().mockReturnThis();
    getCount = jest.fn().mockReturnThis();

    RepositoryMock = jest.fn(() => ({
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      query: jest.fn(),
      createQueryBuilder: jest.fn(() => ({
        select,
        addSelect,
        distinct,
        leftJoin,
        innerJoinAndSelect,
        leftJoinAndSelect,
        where,
        andWhere,
        skip,
        take,
        getMany,
        getCount,
      })),
    }));

    StatusServiceMock = jest.fn<
    Partial<StatusService>,
    StatusService[]
    >(() => ({
      getStatusById: jest.fn(),
    }));

    BrandsServiceMock = jest.fn<
    Partial<BrandsService>,
    BrandsService[]
    >(() => ({
      getBrand: jest.fn(),
    }));

    UsersServiceMock = jest.fn<
    Partial<UsersService>,
    UsersService[]
    >(() => ({
      getUserById: jest.fn(),
    }));
     
    CategoriesServiceMock = jest.fn<
    Partial<CategoriesService>,
    CategoriesService[]
    >(() => ({
      createCategoryProduct: jest.fn(),
    }));
     
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        WinstonModule.forRootAsync({
          useClass: LoggerSettingsService,
        }),
      ],
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: RepositoryMock,
        },
        {
          provide: getRepositoryToken(ProductRating),
          useClass: RepositoryMock,
        },
        {
          provide: getRepositoryToken(ProductInventory),
          useClass: RepositoryMock,
        },
        {
          provide: getRepositoryToken(ProductDimension),
          useClass: RepositoryMock,
        },
        {
          provide: getRepositoryToken(Offer),
          useClass: RepositoryMock,
        },
        {
          provide: getRepositoryToken(ProductPhoto),
          useClass: RepositoryMock,
        },
        {
          provide: getRepositoryToken(ProductQuestion),
          useClass: RepositoryMock,
        },
        {
          provide: StatusService,
          useClass: StatusServiceMock,
        },
        {
          provide: BrandsService,
          useClass: BrandsServiceMock,
        },
        {
          provide: CategoriesService,
          useClass: CategoriesServiceMock,
        },
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
      ],
    }).compile();

    productService = module.get<ProductsService>(ProductsService);
    statusService = module.get<StatusService>(StatusService);
    brandsService = module.get<BrandsService>(BrandsService);
    categoriesService = module.get<CategoriesService>(CategoriesService);
    usersService = module.get<UsersService>(UsersService);
    productRepository = module.get(getRepositoryToken(Product));
    productRatingsRepository = module.get(getRepositoryToken(ProductRating));
    productInventoriesRepository = module.get(getRepositoryToken(ProductInventory));
    productDimensionRepository = module.get(getRepositoryToken(ProductDimension));
    offerRepository = module.get(getRepositoryToken(Offer));
    productPhotoRepository = module.get(getRepositoryToken(ProductPhoto));
    productQuestionRepository = module.get(getRepositoryToken(ProductQuestion));

  });

  describe('createProduct(productParams)', () => {
    let productParams;
    let expectedProduct;
    let result;

    describe('case: success', () => {
        beforeEach(async () => {
            productParams = {
              name: 'iPhone X',
              description: 'Brand new',
              canAccumulatePoits: false,
              price: 800,
              fragile: true,
              status: { id: 1 },
              brand: { id: 1 },
              provider: { id: 1 },
              productDimension: {
                  width: 2,
                  height: 2,
                  long: 2,
                  weight: 2,
              },
              productInventory: {
                  availableQuantity: 20,
                  minimumAvailableQuantity: 2,
              },
              productCatalogues: [
                  {catalogue: { id: 1 }, },
                  {catalogue: { id: 2 }, },
              ],
              productPhotos: [
                  {content: 'iphonephoto1'},
                  {content: 'iphonephoto2'},
                  {content: 'iphonephoto3'},
              ],
            };

            expectedProduct = productExample;

            (productRepository.save as jest.Mock).mockResolvedValue(
              expectedProduct,
            );

            result = await productService.createProduct(productParams);
        });

        it('should invoke productsRepository.save()', () => {
            expect(productRepository.save).toHaveBeenCalledTimes(1);
            expect(productRepository.save).toHaveBeenCalledWith(productParams);
        });
  
        it('should return the created product', () => {
          expect(result).toStrictEqual(expectedProduct);
        });
    });

    describe('case: failure', () => {
      describe('When trying to create a product whitout some fields ', () => {
        beforeEach(async () => {
          productParams = {
            name: 'Iphone',
            description: 'Brand new',
            canAccumulatePoits: undefined,
            price: undefined,
            fragile: true,
            status: { id: 1 },
            brand: { id: 1 },
            provider: { id: 1 }
          };

          (productRepository.save as jest.Mock).mockImplementation(
           () => {
             throw new Error('Error inserting')
           },
          );
        });

        it('should throw an error message when product not saved', () => {
          const result = async () => await productService.createProduct(productParams);
          expect(productRepository.save).toThrow(new Error('Error inserting'));

        });
      });
    })
  });

  describe('updateProduct(productParams)', () => {
    let productParams;
    let expectedProduct;
    let result;

    describe('case: success', () => {
        beforeEach(async () => {
            productParams = {
              id: 58,
              name: 'iPhone X',
              description: 'Brand new',
              canAccumulatePoits: true,
              price: 800,
              fragile: true,
              status: { id: 1 },
              brand: { id: 1 },
              provider: { id: 1 },
              productDimension: {
                  width: 2,
                  height: 2,
                  long: 2,
                  weight: 2,
              },
              productInventory: {
                  availableQuantity: 20,
                  minimumAvailableQuantity: 2,
              },
              productCatalogues: [
                  {catalogue: { id: 1 }, },
                  {catalogue: { id: 2 }, },
              ],
              productPhotos: [
                  {content: 'iphonephoto1'},
                  {content: 'iphonephoto2'},
                  {content: 'iphonephoto3'},
              ],
            };

            expectedProduct = productExample;

            (productRepository.save as jest.Mock).mockResolvedValue(
              expectedProduct,
            );

            result = await productService.updateProduct(productParams);
        });

        it('should invoke productsRepository.save()', () => {
            expect(productRepository.save).toHaveBeenCalledTimes(1);
            expect(productRepository.save).toHaveBeenCalledWith(productParams);
        });
  
        it('should return the updated product', () => {
          expect(result).toStrictEqual(expectedProduct);
        });
    });

    describe('case: failure', () => {
      describe('When trying to update a product whitout some fields ', () => {
        beforeEach(async () => {
          productParams = {
            id: 58,
            name: 'Iphone',
            description: 'Brand new',
            canAccumulatePoits: undefined,
            price: undefined,
          };

          (productRepository.save as jest.Mock).mockImplementation(
           () => {
             throw new Error('Error updating')
           },
          );
        });

        it('should throw an error message when product not updated', () => {
          const result = async () => await productService.updateProduct(productParams);
          expect(productRepository.save).toThrow(new Error('Error updating'));

        });
      });
    })
  });

  describe('deleteProduct(productId)', () => {
    let productId = 40;
    let expectedResult;
    let expectedProductFound ={
      id: 40,
      createdAt: '2020-08-06T21:24:48.375Z',
      updatedAt: '2020-08-06T21:24:48.375Z',
      name: 'Best Choice Products Modern Faux Leather Convertible Futon Sofa',
      description: 'COMFORTABLE FAUX LEATHER',
      canAccumulatePoints: true,
      price: '214.99',
      rating: '4',
      fragile: false
    }
    ;
    let expectedInactiveIdFound;
    let result;
    
    describe('case: success', () => {
        beforeEach(async () => {
   
          expectedInactiveIdFound = 2;
          expectedResult = true;

          jest
          .spyOn(statusService, 'getStatusById')
          .mockResolvedValue(expectedInactiveIdFound);

            (productRepository.findOne as jest.Mock).mockResolvedValue(
              expectedProductFound,
            );

            (productRepository.save as jest.Mock).mockResolvedValue(
              expectedResult,
            );

            result = await productService.deleteProduct(productId);
        });

        it('should invoke productsRepository.save()', () => {
            expect(productRepository.save).toHaveBeenCalledTimes(1);
            expect(productRepository.save).toHaveBeenCalledWith(expectedProductFound);
        });
  
        it('should return True if product was deleted', () => {
          expect(result).toStrictEqual(expectedResult);
        });
    });

    
    describe('case: failure', () => {
      describe('When trying to delete a product that doesn\'t exists ', () => {
        beforeEach(async () => {
          productId = 158,
          expectedProductFound = undefined;

          (productRepository.findOne as jest.Mock).mockResolvedValue(
            expectedProductFound,
          );
          result = productService.deleteProduct(productId);
        });
        it('should throw an error message when product not found', () => {
          expect(result).rejects.toThrow(BadRequestException);

        });
      });

      describe('When the inactive status can not be found', () => {
        beforeEach(async () => {
          expectedResult = true;
          jest
          .spyOn(statusService, 'getStatusById')
          .mockResolvedValue(undefined);

            (productRepository.findOne as jest.Mock).mockResolvedValue(
              expectedProductFound,
            );

            (productRepository.save as jest.Mock).mockImplementation(
              () =>{
                throw new Error('Error deleting the product');
              }
            );
        });

        it('should throw an error when status can not be found and trying to save', () => {
          const result = async () => await productService.deleteProduct(productId);
          expect(productRepository.save).toThrow(new Error('Error deleting the product'));
        });
      });
    })
  });

  describe('getProductById(id)', () => {
    let id;
    let expectedProduct;
    let result;
    
    describe('case: success', () => {
        beforeEach(async () => {
          
          id = 58;

          expectedProduct = productExample;

          (productRepository.findOne as jest.Mock).mockResolvedValue(
            expectedProduct,
          );

          result = await productService.getProductById(id);
        });

        it('should invoke productsRepository.findOne()', () => {
            expect(productRepository.findOne).toHaveBeenCalledTimes(1);
            expect(productRepository.findOne).toHaveBeenCalledWith({
              where: { id },
              relations: [
                  'status',
                  'productPhotos',
                  'productInventory',
                  'provider',
                  'productDimension',
                  'brand',
                  'offer',
                  'productRatings',
              ],
          });
        });

        it('should return the product found by id', () => {
            expect(result).toStrictEqual(expectedProduct);
        });
    });

    describe('case: failure', () => {
      describe('When product id is undefined', () => {
        beforeEach(async () => {
          
          id = undefined;

          (productRepository.findOne as jest.Mock).mockImplementation(
            ()=> {
              throw new Error ('The product id does not exists');
            },
          );
        });

        it('should throw an error if can not find the product', () => {
            const result = async () => await productService.getProductById(id);
            expect(productRepository.findOne).toThrow( new Error ('The product id does not exists'));
        });
      });
    });
  });

  describe('getDailyProductsRecommendation()', () => {
    let expectedProducts;
    let result;
    
    describe('case: success', () => {
        beforeEach(async () => {
          
          expectedProducts = [productExample];

          (productRepository.find as jest.Mock).mockResolvedValue(
            expectedProducts,
          );
          
          result = await productService.getDailyProductsRecommendation();
        });


        it('should return the random list of products', () => {
            expect(result).toStrictEqual(expectedProducts);
        });
    });
  });

  describe('getAllProducts()', () => {
    let expectedProducts;
    let result;
    
    describe('case: success', () => {
        beforeEach(async () => {
          
          expectedProducts = [productExample];

          (productRepository.find as jest.Mock).mockResolvedValue(
            expectedProducts,
          );

          result = await productService.getAllProducts();
        });

        it('should invoke productsRepository.find()', () => {
            expect(productRepository.find).toHaveBeenCalledTimes(1);
            expect(productRepository.find).toHaveBeenCalledWith({
              relations: [
                  'productPhotos',
                  'productInventory',
                  'productDimension',
                  'productRatings',
                  'brand',
                  'provider',
                  'offer',
                  'productCatalogues',
                  'productCatalogues.catalogue',
                  'productCatalogues.catalogue.category',
              ],
          });
        });

        it('should return all the products', () => {
            expect(result).toStrictEqual(expectedProducts);
        });
    });
  });

  describe('getProducts()', () => {
    let expectedProducts;
    let expectedResult;
    let productsNumber = 1; 
    let result;
    
    describe('case: success', () => {
      describe('When the are no filter parameters', () => {
        beforeEach(async () => {
          
          expectedProducts = [productExample];
          expectedResult = {
            products: expectedProducts, 
            productsNumber: 1
          }

          getMany.mockResolvedValue(expectedProducts);
          getCount.mockResolvedValue(productsNumber);

          result = await productService.getProducts({start: 0, limit:1});
        });

        it('should invoke productRepository.createQueryBuilder(), getMany and getCount', () => {
            expect(productRepository.createQueryBuilder().innerJoinAndSelect)
            .toHaveBeenCalled();
            expect(getMany).toHaveBeenCalledTimes(1);
            expect(getCount).toHaveBeenCalledTimes(1);
        });

        it('should return all the products', () => {
            expect(result).toStrictEqual(expectedResult);
        });
      });

      describe('When there are some parameters to filter the search', () => {
        let parameters = {
          start: 0, 
          limit: 1,
          name: 'iPhone X',
          price: 900
        }
        beforeEach(async () => {
          
          expectedProducts = [productExample];
          expectedResult = {
            products: expectedProducts, 
            productsNumber: 1
          }

          getMany.mockResolvedValue(expectedProducts);
          getCount.mockResolvedValue(productsNumber);

          result = await productService.getProducts(parameters);
        });

        it('should filter the products by the parameters (name, price)', () => {
            expect(productRepository.createQueryBuilder().innerJoinAndSelect)
            .toHaveBeenCalled();
            expect(andWhere).toHaveBeenCalledWith('UPPER(product.name) LIKE :name', 
            { name: `%${parameters.name.toUpperCase()}%` });
            expect(andWhere).toHaveBeenCalledWith('product.price <= :price', 
            { price: parameters.price });
        });

        it('should return all the products', () => {
            expect(result).toStrictEqual(expectedResult);
        });
      });
    });
  });
});
