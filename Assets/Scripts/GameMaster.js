#pragma strict
var Title : UnityEngine.UI.Text;
var Instructions : UnityEngine.UI.Text;

var Level : UnityEngine.UI.Text;
var Lives : UnityEngine.UI.Text;
var Score : UnityEngine.UI.Text;

var Level_Value : int;
var Lives_Total : int;
var Score_Backup : int;

var Brick_Original : GameObject;
var Brick_Clone : GameObject;
var Ball_Original : GameObject;
var Ball_Clone : GameObject;
var Player : GameObject;
var Wall : GameObject; //So blocks dont spawn in walls
var Drop_Top : GameObject; //The one that is below the top and above the drop ;)
var Column : float = 1;
var Row : float = 1;
var width : float;
var height : float;

function Start () {
	width = Camera.main.orthographicSize * 2.0 * Screen.width / Screen.height;
	height = Camera.main.orthographicSize * 2.0;
	PlayerPrefs.SetInt("Score", 0);
	PlayerPrefs.SetInt("Lives Used", 0);
}

function Update () {
	if (Input.GetMouseButtonDown(0) && Title.text != "") {
		Title.text = "";
		Instructions.text = "";
		Level_Value = 1;
		Lives_Total = 5;
		Column = 1;
		Row = 1;
		PlayerPrefs.SetInt("Score", 0);
		PlayerPrefs.SetInt("Lives Used", 0);
		Blocks_Spawn();
		Respawn();
	}

	if (PlayerPrefs.GetInt("Lives Used") >= Lives_Total && Level_Value != 0) {
		Title.text = "G A M E O V E R";
		Instructions.text = "T A P  T O  R E T R Y";
		PlayerPrefs.SetInt("Score", -1);
	}

	if (PlayerPrefs.GetInt("Score") >= Level_Value * 49 * 5 && Level_Value != 0) {
		Level_Value++;
		Lives_Total = Lives_Total + Level_Value - 1;
		Column = 1;
		Row = 1;
		Blocks_Spawn();
	}else if (PlayerPrefs.GetInt("Score") == -2) {
		PlayerPrefs.SetInt("Score", Score_Backup);
		Respawn();
	}

	Level.text = "L E V E L  " + Level_Value;
	Lives.text = PlayerPrefs.GetInt("Lives Used") + "/" + Lives_Total;
	if (PlayerPrefs.GetInt("Score") != -1) {
		Score.text = "S C O R E  " + PlayerPrefs.GetInt("Score");
		Score_Backup = PlayerPrefs.GetInt("Score");
	}
}

function Blocks_Spawn () {
	var Bricks_Generated : int = 0;
	var Brick_Zone_X : float = width - (Wall.GetComponent.<Renderer>().bounds.size.x * 2);
	var Brick_Zone_Y : float = height - (height - (Drop_Top.transform.position.y + .5)) - .5;
	Debug.Log(Row);
	while (Bricks_Generated < 49) {
		Brick_Clone = Instantiate(Brick_Original, new Vector3 (((Brick_Zone_X / 7) * (Column - 1)) - (Brick_Zone_X / 2) + ((Brick_Zone_X / 7) / 2), Brick_Zone_Y - (Brick_Original.GetComponent.<Renderer>().bounds.size.y * Row * 1.25), 0),  Quaternion.identity);
		Brick_Clone.transform.localScale.x = Brick_Zone_X / 7.5;
		Brick_Clone.name = "Brick #" + Row + "-" + Column;
		Column++;
		if (Column > 7) {
			Column = 1;
			Row++;
		}
		Bricks_Generated++;
	}
}

function Respawn () {
	yield WaitForSeconds (1);
	Ball_Clone = Instantiate(Ball_Original, new Vector3 (Player.transform.position.x, -9, 0),  Quaternion.identity);
}