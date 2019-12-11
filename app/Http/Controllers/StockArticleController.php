<?php

namespace App\Http\Controllers;

use App\StockArticle;
use Illuminate\Http\Request;
use App\Repositories\Repository;

class StockArticleController extends Controller
{
    protected $model;

    public function __construct(StockArticle $stockArticle){
        $this->model = new Repository($stockArticle);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles = StockArticle::with(['famille', 'fournisseur', 'marque'])->get();

        return response()->json($articles);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
         
        $article = new StockArticle;
        $creation = $article->create($request->only($article->fillable));
 
        return response()->json(StockArticle::with(['famille', 'fournisseur', 'marque'])
                                                             ->find($creation->id));

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->model->show($id);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function edit(CoutConsomable $coutConsomable)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
         // update model and only pass in the fillable fields
         $this->model->update($request->only($this->model->getModel()->fillable), $id);

         return response()->json(StockArticle::with(['famille', 'fournisseur', 'marque'])->find($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id)
    {
        return $this->model->delete($id);

    }
}
