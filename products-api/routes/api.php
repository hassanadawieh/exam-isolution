<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\productsController;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register']);

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/product', [productsController::class, 'addProduct'])->middleware('api');
    Route::put('/product/{id}', [ProductsController::class, 'updateProduct'])->middleware('api');
    Route::delete('/product/{id}', [ProductsController::class, 'deleteProduct'])->middleware('api');
    Route::get('/products', [ProductsController::class, 'getAllProducts'])->middleware('api');
});


