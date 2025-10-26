<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $cartItems = CartItem::with(['menuItem', 'variant'])->where('user_id', $user->id)->get();
        return response()->json($cartItems);
    }

    public function store(Request $request)
    {
        $request->validate([
            'menu_item_id' => 'required|exists:menu_items,id',
            'menu_item_variant_id' => 'nullable|exists:menu_item_variants,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        $cartItem = CartItem::updateOrCreate(
            [
                'user_id' => $user->id,
                'menu_item_id' => $request->menu_item_id,
                'menu_item_variant_id' => $request->menu_item_variant_id,
            ],
            [
                'quantity' => $request->quantity,
                'price' => $request->price ?? null,
            ]
        );

        return response()->json($cartItem);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::findOrFail($id);
        $cartItem->update([
            'quantity' => $request->quantity,
        ]);

        return response()->json($cartItem);
    }

    public function destroy($id)
    {
        $cartItem = CartItem::findOrFail($id);
        $cartItem->delete();

        return response()->json(['message' => 'Cart item removed']);
    }

    public function clear()
    {
        $user = Auth::user();
        CartItem::where('user_id', $user->id)->delete();

        return response()->json(['message' => 'Cart cleared']);
    }
}
