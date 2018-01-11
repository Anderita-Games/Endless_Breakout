#pragma strict
var Speed : float = 12;
var NewAngle : float;

function Start () {
	var RandomAngle : float = Random.Range(40.0f, 140.0f);
	transform.rotation = Quaternion.Euler(0, 0, RandomAngle);
}

function Update () {
	transform.Translate(Vector3.right * 12 * Time.deltaTime);

	if (transform.position.x < (Camera.main.orthographicSize * 2.0 * Screen.width / Screen.height) / -2) {
		transform.position.x = (Camera.main.orthographicSize * 2.0 * Screen.width / Screen.height) / -2;
		transform.rotation = Quaternion.Euler(0, 0, 180 - transform.rotation.eulerAngles.z);
	}else if (transform.position.x > (Camera.main.orthographicSize * 2.0 * Screen.width / Screen.height) / 2) {
		transform.position.x = (Camera.main.orthographicSize * 2.0 * Screen.width / Screen.height) / 2;
		transform.rotation = Quaternion.Euler(0, 0, 180 - transform.rotation.eulerAngles.z);
	}
}

function OnCollisionEnter (col : Collision) {
	if (col.collider.name == "Player") {
		NewAngle = (transform.position.x - col.transform.position.x) / 2; //The bounce angle effect for paddles
		Debug.Log(NewAngle);
		if (NewAngle > 0) {
			NewAngle = (NewAngle * -180) + 90;
		}else if (NewAngle < 0) {
			NewAngle = (NewAngle * 180) + 180;
		}else {
			NewAngle = 180;
		}
		transform.rotation = Quaternion.Euler(0, 0, NewAngle);
	}else if (col.collider.name == "Bottom") {
		PlayerPrefs.SetInt("Lives Used", PlayerPrefs.GetInt("Lives Used") + 1);
		PlayerPrefs.SetInt("Score", -2);
		Destroy(gameObject);
	}else {
		var Ray_Position :  Ray = new Ray (transform.position, transform.right);
		var Ray_Victim : RaycastHit;
		Physics.Raycast(Ray_Position, Ray_Victim, 100);
		var MyNormal : Vector3 = Ray_Victim.normal;
		MyNormal = Ray_Victim.transform.TransformDirection(MyNormal);
		
		if (transform.eulerAngles.z > 0 && transform.eulerAngles.z < 90) { //Angle going Top-Right
			if (MyNormal == -Ray_Victim.transform.up) { //Touches the bottom side
				transform.rotation = Quaternion.Euler(0, 0, 360 - transform.rotation.eulerAngles.z);
			}else if (MyNormal == -Ray_Victim.transform.right) { //Touches the left side
				transform.rotation = Quaternion.Euler(0, 0, 180 - transform.rotation.eulerAngles.z);
			}
		}else if (transform.eulerAngles.z > 90 && transform.eulerAngles.z < 180) { //Angle going Top-Left
			if (MyNormal == -Ray_Victim.transform.up) { //Touches the bottom side
				transform.rotation = Quaternion.Euler(0, 0, 360 - transform.rotation.eulerAngles.z);
			}else if (MyNormal == Ray_Victim.transform.right) { //Touches the right side
				transform.rotation = Quaternion.Euler(0, 0, 180 - transform.rotation.eulerAngles.z);
			}
		}else if (transform.eulerAngles.z > 180 && transform.eulerAngles.z < 270) { //Angle going Bottom-Left
			if (MyNormal == Ray_Victim.transform.up) { //Touches the top side
				transform.rotation = Quaternion.Euler(0, 0, 360 - transform.rotation.eulerAngles.z);
			}else if (MyNormal == Ray_Victim.transform.right) { //Touches the right side
				transform.rotation = Quaternion.Euler(0, 0, 180 - transform.rotation.eulerAngles.z);
			}
		}else if (transform.eulerAngles.z > 270 && transform.eulerAngles.z < 360) { //Angle going Bottom-Right
			if (MyNormal == Ray_Victim.transform.up) { //Touches the top side
				transform.rotation = Quaternion.Euler(0, 0, 360 - transform.rotation.eulerAngles.z);
			}else if (MyNormal == -Ray_Victim.transform.right) { //Touches the left side
				transform.rotation = Quaternion.Euler(0, 0, 180 - transform.rotation.eulerAngles.z);
			}
		}
	}
}

