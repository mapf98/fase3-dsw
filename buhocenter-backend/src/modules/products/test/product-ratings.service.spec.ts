import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Repository, EntityManager } from 'typeorm';
import { WinstonModule } from 'nest-winston';

import { ProductRating } from '../entities/product-rating.entity';
import { ProductsService } from '../services/products.service';
import { LoggerSettingsService } from '../../settings/services/logger.service';
import { ProductRatingsService } from '../services/product-ratings.service';

describe('Product Ratings Service', () => {

  let productRatingsService: ProductRatingsService;
  let RepositoryMock: jest.Mock;
  let productRatingRepository : Repository<ProductRating>;
  let productRatingTransactionRepository : Repository<ProductRating>;


  let productsServiceMock: jest.Mock<Partial<ProductsService>>;
  let productsService: ProductsService;


  beforeEach(() => {
    RepositoryMock = jest.fn(() => ({
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      query: jest.fn(),
      getRepository: jest.fn(),
    }));   
    
    
    productsServiceMock = jest.fn<
    Partial<ProductsService>,
    ProductsService[]
    >(() => ({
      updateProductRating: jest.fn(),
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
        ProductRatingsService,
        {
          provide: getRepositoryToken(ProductRating),
          useClass: RepositoryMock,
        },
        {
          provide: ProductsService,
          useClass: productsServiceMock,
        },
      ]
    }).compile();

    productRatingsService = module.get<ProductRatingsService>(ProductRatingsService);
    productRatingRepository = module.get(getRepositoryToken(ProductRating));
    productRatingTransactionRepository = module.get(getRepositoryToken(ProductRating));
    productsService = module.get<ProductsService>(ProductsService);

  });

  let ratingMock = {
    "id": 1,
    "createdAt": "2020-01-25T04:00:00.000Z",
    "updatedAt": "2020-01-25T04:00:00.000Z",
    "rating": 5,
    "comment": "Me ecanto el producto, maravilloso!",
    "date": "2020-01-25T04:00:00.000Z",
    "user": {
        "id": 1,
        "createdAt": "2020-08-06T21:24:48.375Z",
        "updatedAt": "2020-08-06T21:24:48.375Z",
        "name": "Carlos",
        "lastName": "Perez",
        "birthdate": "1999-01-25T04:00:00.000Z",
        "email": "carlos@gmail.com",
        "cellphone": null,
        "is_federate": true,
        "loyaltySystemToken": null,
        "uid": "UVvWC9yrxcjRqbNrEjb0w7BYlq2",
        "token": null,
        "language": null,
        "fidelityUserEmail": null,
        "status": 1,
        "foreignExchange": 1
    }
  };

  describe('getProductRatingsByProductId(productId)', () => {
    let expectedRatings;
    let productId;
    let result;
    
    describe('case: success', () => {
        beforeEach(async () => {
          
          productId = 1;
          expectedRatings =  [{
            "id": 1,
            "createdAt": "2020-01-25T04:00:00.000Z",
            "updatedAt": "2020-01-25T04:00:00.000Z",
            "rating": 5,
            "comment": "Me ecanto el producto, maravilloso!",
            "date": "2020-01-25T04:00:00.000Z",
            "user": {
                "id": 1,
                "createdAt": "2020-08-06T21:24:48.375Z",
                "updatedAt": "2020-08-06T21:24:48.375Z",
                "name": "Carlos",
                "lastName": "Perez",
                "birthdate": "1999-01-25T04:00:00.000Z",
                "email": "carlos@gmail.com",
                "cellphone": null,
                "is_federate": true,
                "loyaltySystemToken": null,
                "uid": "UVvWC9yrxcjRqbNrEjb0w7BYlq2",
                "token": null,
                "language": null,
                "fidelityUserEmail": null,
                "status": 1,
                "foreignExchange": 1
            }
          }];

          (productRatingRepository.find as jest.Mock).mockResolvedValue(
            expectedRatings,
          );

          result = await productRatingsService.getProductRatingsByProductId(productId);
        });

      it('should invoke productRatingRepository.find()', () => {
          expect(productRatingRepository.find).toHaveBeenCalledTimes(1);
          expect(productRatingRepository.find).toHaveBeenCalledWith({
            relations: ['user'],
            where: { product: productId },
        });
      });

      it('should return the ratings made by product id', () => {
          expect(result).toStrictEqual(expectedRatings);
      });
    });

    describe('case: failure', () => {
      describe('When either product id is undefined or does not exists', () => {
        beforeEach(async () => {
    
          productId = undefined;
    
          (productRatingRepository.find as jest.Mock).mockImplementation(
            ()=> {
              throw new Error('Error finding the ratings of the product');
            },
          );
        });

        it('should throw an error while finding the ratings', () => {
          const result = async () => await productRatingsService
          .getProductRatingsByProductId(productId);
          expect(productRatingRepository.find )
          .toThrow(new Error('Error finding the ratings of the product'));
        });
      });
    }); 
  });

  describe('getProductRatingByUserIdAndProductId(userId, productId)', () => {
    let expectedRating;
    let productId;
    let userId;
    let result;
    
    describe('case: success', () => {
        beforeEach(async () => {
          
          productId = 1;
          userId = 1;
          expectedRating = {
            "id": 1,
            "createdAt": "2020-01-25T04:00:00.000Z",
            "updatedAt": "2020-01-25T04:00:00.000Z",
            "rating": 5,
            "comment": "Me ecanto el producto, maravilloso!",
            "date": "2020-01-25T04:00:00.000Z",
            "user": {
                "id": 1,
                "createdAt": "2020-08-06T21:24:48.375Z",
                "updatedAt": "2020-08-06T21:24:48.375Z",
                "name": "Carlos",
                "lastName": "Perez",
                "birthdate": "1999-01-25T04:00:00.000Z",
                "email": "carlos@gmail.com",
                "cellphone": null,
                "is_federate": true,
                "loyaltySystemToken": null,
                "uid": "UVvWC9yrxcjRqbNrEjb0w7BYlq2",
                "token": null,
                "language": null,
                "fidelityUserEmail": null,
                "status": 1,
                "foreignExchange": 1
            }
          };

          (productRatingRepository.findOne as jest.Mock).mockResolvedValue(
            expectedRating,
          );

          result = await productRatingsService.
          getProductRatingByUserIdAndProductId(userId, productId);
        });

      it('should invoke productRatingRepository.findOne()', () => {
          expect(productRatingRepository.findOne).toHaveBeenCalledTimes(1);
          expect(productRatingRepository.findOne).toHaveBeenCalledWith({
            where: { user: userId, product: productId },
        });
      });

      it('should return the rating made by product id and user id', () => {
          expect(result).toStrictEqual(expectedRating);
      });
    });

    describe('case: failure', () => {
      describe('When product id or user id are undefined or does not exists', () => {
        beforeEach(async () => {
    
          productId = undefined;
          userId = -1;
    
          (productRatingRepository.findOne as jest.Mock).mockImplementation(
            ()=> {
              throw new Error('Error finding the ratings of the product and user');
            },
          );
        });

        it('should throw an error while finding the ratings by user and product', () => {
          const result = async () => await productRatingsService
          .getProductRatingByUserIdAndProductId(userId, productId);
          expect(productRatingRepository.findOne )
          .toThrow(new Error('Error finding the ratings of the product and user'));
        });
      });
    }); 
  });
})

