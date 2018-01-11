#pragma strict
var Wall_Top : GameObject;
var Wall_Bottom : GameObject;
var Wall_Left : GameObject;
var Wall_Right : GameObject;
var Point : Vector3;
var width;
var height;

function Start () {
	//Position Stuff
	Point = Camera.main.ScreenToWorldPoint(new Vector3 (Screen.width, Screen.height, 0));
	Wall_Top.transform.position.y = Point.y - (Wall_Top.GetComponent.<Renderer>().bounds.size.y / 2);
	Wall_Bottom.transform.position.y = -Point.y + (Wall_Bottom.GetComponent.<Renderer>().bounds.size.y / 2);
	Wall_Right.transform.position.x = Point.x - (Wall_Right.GetComponent.<Renderer>().bounds.size.x / 2);
	Wall_Left.transform.position.x = -Point.x + (Wall_Left.GetComponent.<Renderer>().bounds.size.x / 2);
	//Size Stuff
	width = Camera.main.orthographicSize * 2.0 * Screen.width / Screen.height;
	height = Camera.main.orthographicSize * 2.0;
	Wall_Top.transform.localScale.x = width;
	Wall_Bottom.transform.localScale.x = width;
	Wall_Left.transform.localScale.y = height;
	Wall_Right.transform.localScale.y = height;
}

function Update () {
	
}
