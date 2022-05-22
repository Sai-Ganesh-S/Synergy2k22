import 'package:flutter/material.dart';
import 'package:flutter_maps/login/login_1.dart';
import 'package:flutter_maps/maps/maps.dart';
void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
        home: Builder(
          builder: (context) {
            return Scaffold(

              appBar: AppBar(
                title: Text('RAKSHAN',),
                actions: [
                  IconButton(
                    icon: Icon(Icons.camera),
                    onPressed: () {
                      Navigator.push(context,MaterialPageRoute(builder: (context)=> Login()));
                    },
                  )
                ],

              ),
              body:
              Center(
                child: RaisedButton(
                  onPressed: () {
                    Navigator.push(context,MaterialPageRoute(builder: (context)=> MapView()));
                  },
                  child: Text(' SOS '),
                  color: Colors.deepOrange,
                  textColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: new BorderRadius.circular(100),
                  ),
                  padding: EdgeInsets.fromLTRB(12, 12, 12, 12),
                ),
              ),
            );
          },
        )
    );
  }
}