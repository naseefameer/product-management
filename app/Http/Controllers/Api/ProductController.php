<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Imports\ProductImport;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index()
    {
        return ProductResource::collection(Product::query()->paginate(20));
    }

    public function import(Request $request)
    {
        $errors = [];
        if ($request->hasFile('csv_file')) {
            $row_num = 0;
            DB::beginTransaction();
            $productImport = new ProductImport();
            $productImport->import($request->file('csv_file'));
            foreach ($productImport->failures() as $failure) {
                $row_num = $failure->row();
                foreach ($failure->errors() as $error) {
                    $errors[] = "Row " . $row_num . " - " . $error;
                }
            }

            if(empty($errors)) {
                DB::commit();
                return response(['message' => 'CSV imported successfully']);
            } else {
                DB::rollBack();
                return response(['message' => 'Error importing CSV', 'errors' => $errors], 500);
            }
        }
        return response()->json(['message' => 'No CSV file uploaded'], 400);
    }
}
