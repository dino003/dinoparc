<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Symfony\Component\Process\Process;


class UtilController extends Controller
{
    // public function deploy(Request $request)
    // {
    //     $githubPayload = $request->getContent();
    //     $githubHash = $request->header('X-Hub-Signature');
 
    //     $localToken = config('app.deploy_secret');
    //     $localHash = 'sha1=' . hash_hmac('sha1', $githubPayload, $localToken, false);
 
    //     if (hash_equals($githubHash, $localHash)) {
    //          $root_path = base_path();
    //          $process = new Process('cd ' . $root_path . '; ./deploy.sh');
    //          $process->run(function ($type, $buffer) {
    //            //  echo $buffer;
    //              return response()->json($buffer);

    //          });

    //     }
    // }

    public function deploy_autre(Request $request){
        $gitUserLogin = 'dino003';
        $sender = $request->get('sender');
        $branch = $request->get('ref');

        // $githubPayload = $request->getContent();
        // $githubHash = $request->header('X-Hub-Signature');
 
        // $localToken = config('app.deploy_secret');
       // $localHash = 'sha1=' . hash_hmac('sha1', $githubPayload, $localToken, false);
 
        // if (hash_equals($githubHash, $localHash)) {
           //  Artisan::call('git:deploy');

            // exit;
        // }

        return $branch;
    }
}
