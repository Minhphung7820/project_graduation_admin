<?php

namespace App\Http\Controllers\API;

use App\Events\NotificationsRating;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Pusher\Pusher;
class MakeEvent extends Controller
{
    public function makeNotRatingEvent(Request $request)
    {
          $data['message'] = $request->message;
          $options = array(
            'cluster' => 'ap1',
            'encrypted' => true
         );
         $pusher = new Pusher(
            "d64673b10884e3d30bfd",
            "2a332fc1f9a5f1404500",
            "1472357",
            $options
        );
        $pusher->trigger('NotificationsRating', 'ChannelNotRating', $data);
          
    }
}
