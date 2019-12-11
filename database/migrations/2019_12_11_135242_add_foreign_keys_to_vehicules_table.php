<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToVehiculesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('vehicules', function(Blueprint $table)
		{
			$table->foreign('categorie', 'FK_vehicule_categorie')->references('id')->on('parametrage_codifications_categories_vehicules')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('chauffeur_atitre', 'FK_vehicule_chauffeur_atitre')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('detenteur', 'FK_vehicule_detenteur')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('entite_comptable', 'FK_vehicule_entite_comptable')->references('id')->on('parametrage_entites')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('entite_physique', 'FK_vehicule_entite_physique')->references('id')->on('parametrage_entites')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('marque', 'FK_vehicule_marque')->references('id')->on('marques')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('tiers', 'FK_vehicule_tiers')->references('id')->on('tiers')->onUpdate('SET NULL')->onDelete('SET NULL');
			$table->foreign('demandeur', 'FKvehicule_demandeur')->references('id')->on('personnels')->onUpdate('SET NULL')->onDelete('SET NULL');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('vehicules', function(Blueprint $table)
		{
			$table->dropForeign('FK_vehicule_categorie');
			$table->dropForeign('FK_vehicule_chauffeur_atitre');
			$table->dropForeign('FK_vehicule_detenteur');
			$table->dropForeign('FK_vehicule_entite_comptable');
			$table->dropForeign('FK_vehicule_entite_physique');
			$table->dropForeign('FK_vehicule_marque');
			$table->dropForeign('FK_vehicule_tiers');
			$table->dropForeign('FKvehicule_demandeur');
		});
	}

}
