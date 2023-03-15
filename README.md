# Ecommerct-Project
RESTful API Project


It is built with node js, express js, and mongoDB.


Authentication
Youy can POST sign ip for new users, POST forgot password, PATCH reset password, POST login user account, and PATCH update currect password.
Just be informed that all the function needs authentication with the users email address.

POST User Sign Up
http://127.0.0.1:5000/user/signup
Use this endpoint to signup new user account.

Please see the following data required for signin in user's account.
name:
email:
photo:
role:
password:
passwordConfirm:

POST Forgot Password
http://127.0.0.1:5000/user/forgotpassword
Use this endpoint to forgot password.
Auto generated email will be sent to the user's email for verification and steps to reset their password.

PATCH Reset Password
http://127.0.0.1:5000/user/resetPassword/${id}
Use this endpoint to reset the password of the user.

POST Login User Account
http://127.0.0.1:5000/user/login
Use this endpoint to Login User's Account.

PATCH Update Current Password
http://127.0.0.1:5000/user/updatepassword
Use this endpoint to update current password of the user.




User
You can CREATE user, GET all user, GET user, DELETE user, UPDATE user data, and GET current user.
Just be informed that only user with "admin" roles can CREATE, DELETE, and UPDATE users.

POST Create User Account (for admin)
http://127.0.0.1:5000/user
Use thin endpoint to create a new user account (for admin)

To admins, use the following fields to create user account
name:
email:
photo:
role:
password:
passwordConfirm:

GET all users
http://127.0.0.1:5000/user
Use this endpoint to get all user

GET user
http://127.0.0.1:5000/user/${id}
Use this endpoint to get a specific user

DELETE current user
http://127.0.0.1:5000/user/deleteMe
Use this endpoint to delete the current user

PATCH Update User Data
http://127.0.0.1:5000/user/updateMe
Use this endpoint to update user's data. (except for email and password)

Get Current User
http://127.0.0.1:5000/user/me
Use this endpoint to get the data of current user.




Product
You can CREATE new products, UPDATE product's details, GET a specific product, GET all products, GET the top 5 highest ratings, and GET product stats.

Just be informed that only users with "admin" role can CREATE new products, UPDATE product details and has access to GET product stats

GET all product
http://127.0.0.1:5000/productpage
Use this endpoint to get all products.
You can also use queries such as sort, filter, limit, and paginate.

POST Create New Product
http://127.0.0.1:5000/productpage
Use this endpont to create a new product.

Please see the below fields to be filled-out.
product:
price:
description:
shortDescription:
quantity:
imageCover:
images:

PATCH Update Product's details
http://127.0.0.1:5000/productpage/${id}
Use this endpoint to update product's details.

Delete Product
http://127.0.0.1:5000/productpage/${id}
Use this endpoint to delete a specific product.

Get Product
http://127.0.0.1:5000/productpage/${id}
Use this endpoint to get a specific product.

GET product stats
http://127.0.0.1:5000/productpage/product-stats
Use this endpoint to get the latest month's product stats.  (for admin only)

GET Top 5 Highest Ratings
http://127.0.0.1:5000/productpage/top-5-highest-rating
Use this endpoint to get the top 5 highest rating products.

GET Current User
http://127.0.0.1:5000/user/me
Use this endpoint to get the data of current user.

Reviews
You can GET all reviews, CREATE review, and DELETE review.
Be informed that you need to manually indicate the productId to the query.

Get All Reviews
http://127.0.0.1:5000/reviews
Use this endpoint to get all products reviews.

POST Create Review
http://127.0.0.1:5000/reviews
Use this endpoint to create reviews on product by specifying the prodictId.

Please see the below fields to be filled-out.
review:
rating:
product:

Delete Review
http://127.0.0.1:5000/reviews/${id}
Use this endpoint to delete reviews

POST Create Product Reviews
http://127.0.0.1:5000/productpage/${id}/reviews
Use this endpoint to create product reviews by using

Please see the below fields to be filled-out.
review:
rating:
product:

GET Get All reviews from product
http://127.0.0.1:5000/productpage/${id}/reviews
Use this endpoint to get all the reviews from product by using


