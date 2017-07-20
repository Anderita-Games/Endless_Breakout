#pragma strict

function Update () {
	if (PlayerPrefs.GetInt("Score") == -1) {
		Destroy(gameObject);
	}
}

function OnCollisionEnter (col : Collision) {
	PlayerPrefs.SetInt("Score", PlayerPrefs.GetInt("Score") + 5);
	Destroy(gameObject);
}