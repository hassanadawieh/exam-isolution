<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\product;

class productsController extends Controller
{
        public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function addProduct(Request $request){
        $product = new product;
        $title = $request->input('title');
        $description = $request->input('description');
        $price = $request->input('price');
        $quantity = $request->input('quantity');
        if(!$title){
            return response()->json([
                "message" => "title is required",
            ]); 
        }
                if(!$price){
            return response()->json([
                "message" => "price is required",
            ]); 
        }
                if(!$quantity){
            return response()->json([
                "message" => "quantity is required",
            ]); 
        }

        $product->title = $title;
        $product->description = $description;
        $product->price = $price;
        $product->quantity = $quantity;

        $product->save();

        return response()->json([
            'message' => 'product created successfully',
        ]);
    }

    public function updateProduct(Request $request, $id){

    $product = Product::find($id);

    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    $title = $request->input('title');
    $description = $request->input('description');
    $price = $request->input('price');
    $quantity = $request->input('quantity');
    
    $product->title = $title;
    $product->description = $description;
    $product->price = $price;
    $product->quantity = $quantity;

    $product->save();

    return response()->json(['message' => 'Product updated successfully', 'data' => $product]);
    }

    public function deleteProduct($id){

    $product = Product::find($id);

    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    $product->delete();

    return response()->json(['message' => 'Product deleted successfully']);
    }

    public function getAllProducts(){

    $products = Product::all();

    return response()->json(['data' => $products]);
    }
}
