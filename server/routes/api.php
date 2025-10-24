<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\RestaurantController;
use App\Http\Controllers\API\CourierController;
use App\Http\Controllers\API\SupportController;
use App\Http\Controllers\API\NotificationController;
use App\Http\Controllers\API\RestaurantRatingController;

Route::middleware('auth:sanctum')->group(function () {

    // Upgrade role (user can upgrade to courier or restaurant)
    Route::post('/upgrade-role', [UserController::class, 'upgradeRole']);

    // User Routes
    Route::middleware('role:user')->group(function () {
        Route::get('/restaurants', [UserController::class, 'getRestaurants']);
        Route::get('/restaurants/{restaurant_id}/menu', [UserController::class, 'getMenu']);
        Route::put('/profile', [UserController::class, 'updateProfile']);
        Route::post('/orders', [UserController::class, 'placeOrder']);
        Route::post('/orders/{order_id}/cancel', [UserController::class, 'cancelOrder']);
        Route::post('/reservations', [UserController::class, 'makeReservation']);
        Route::post('/reservations/{reservation_id}/cancel', [UserController::class, 'cancelReservation']);
        Route::post('/orders/{order_id}/rate', [UserController::class, 'rateRestaurant']);
        Route::get('/orders/history', [UserController::class, 'ordersHistory']);
        Route::get('/notifications', [UserController::class, 'notifications']);
    });

    // Restaurant Routes
    Route::middleware('role:restaurant')->group(function () {
        Route::get('/restaurant/dashboard', [RestaurantController::class, 'dashboard']);
        Route::put('/restaurant/orders/{order_id}/status', [RestaurantController::class, 'updateOrderStatus']);
        Route::post('/restaurant/menu', [RestaurantController::class, 'addMenuItem']);
        Route::delete('/restaurant/menu/{id}', [RestaurantController::class, 'deleteMenuItem']);
        Route::get('/restaurant/menu', [RestaurantController::class, 'getMenu']);
        Route::get('/restaurant/notifications', [RestaurantController::class, 'notifications']);
    });

    // Courier Routes
    Route::middleware('role:courier')->group(function () {
        Route::get('/courier/orders/available', [CourierController::class, 'availableOrders']);
        Route::post('/courier/orders/{order_id}/accept', [CourierController::class, 'acceptOrder']);
        Route::post('/courier/orders/{order_id}/complete', [CourierController::class, 'completeDelivery']);
        Route::get('/courier/orders/history', [CourierController::class, 'deliveriesHistory']);
        Route::get('/courier/notifications', [CourierController::class, 'notifications']);
    });

    // Support Routes
    Route::middleware('role:support')->group(function () {
        Route::get('/support/tickets', [SupportController::class, 'index']);
        Route::post('/support/tickets', [SupportController::class, 'store']);
        Route::get('/support/tickets/{id}', [SupportController::class, 'show']);
        Route::post('/support/tickets/{id}/resolve', [SupportController::class, 'resolve']);
        Route::post('/support/orders/{order_id}/refund', [SupportController::class, 'refundOrder']);
        Route::post('/support/reservations/{reservation_id}/cancel', [SupportController::class, 'cancelReservation']);
    });

    // Admin Routes
    Route::middleware('role:admin')->group(function () {
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::delete('/notifications/{id}', [NotificationController::class, 'destroy']);
        Route::delete('/notifications', [NotificationController::class, 'clearAll']);
    });

    // Ratings accessible by any user
    Route::middleware('role:user')->group(function () {
        Route::post('/ratings/{order_id}', [RestaurantRatingController::class, 'rate']);
    });
    Route::get('/ratings/restaurant/{restaurant_id}', [RestaurantRatingController::class, 'getRestaurantRatings']);
});
