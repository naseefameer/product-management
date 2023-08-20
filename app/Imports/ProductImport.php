<?php

namespace App\Imports;

use App\Models\Product;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class ProductImport implements ToCollection, SkipsEmptyRows, WithHeadingRow, WithValidation, SkipsOnFailure, WithChunkReading

{
    use Importable, SkipsFailures;

    private $errors = []; // array to accumulate errors


    public function collection(Collection $rows)
    {
        $rows = $rows->toArray();

        // iterating each row and validating it:
        foreach ($rows as $key => $row) {
            $validator = Validator::make($row, $this->rules(), $this->validationMessages());
            if ($validator->fails()) {
                foreach ($validator->errors()->messages() as $messages) {
                    foreach ($messages as $error) {
                        $this->errors[] = $error; // accumulating errors:
                    }
                }
            } else {
                $product              = new Product();
                $product->name        = $row['product_name'];
                $product->price       = $row['price'];
                $product->sku         = $row['sku'];
                $product->description = $row['description'];
                $product->save();
            }
        }
    }

    // this function returns all validation errors after import:
    public function getErrors()
    {
        return $this->errors;
    }

    public function rules(): array
    {
        return [
            'product_name'  => 'required|max:255',
            'price'         => 'required|numeric',
            'sku'           => 'required|max:100',
            'description'   => 'required|max:500',
        ];
    }

    public function customValidationAttributes()
    {
        return [
            'product_name' => 'product name'
        ];
    }

    public function validationMessages()
    {
        return [
            'product_name.required'     => "product name is required",
            'price.required'            => "price is required",
            'sku.required'              => "sku is required",
            'description.required'      => "description is required",
        ];
    }

    public function startRow(): int
    {
        return 2;
    }

    public function chunkSize(): int
    {
        return 500;
    }
}
