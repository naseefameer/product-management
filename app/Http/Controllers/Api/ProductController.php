<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Imports\ProductImport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller
{
    public function index()
    {
    }

    public function import(Request $request)
    {
        $errors = [];
        if ($request->hasFile('csv_file')) {
            $row_num = 0;
            $productImport = new ProductImport();
            $productImport->import($request->file('csv_file'));
            foreach ($productImport->failures() as $failure) {
                $row_num = $failure->row();
                foreach ($failure->errors() as $error) {
                    $errors[] = "Row " . $row_num . " - " . $error;
                }
            }

            if(empty($errors)) {
                return response(['message' => 'CSV imported successfully']);
            } else {
                return response(['message' => 'Error importing CSV', 'errors' => $errors], 500);
            }
        }
        return response()->json(['message' => 'No CSV file uploaded'], 400);
    }
}
