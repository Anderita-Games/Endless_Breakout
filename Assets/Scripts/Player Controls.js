#pragma strict

function Start () {

}

function Update () {
	if (Input.GetKey (KeyCode.LeftArrow)) {
		GetComponent.<Rigidbody>().velocity.x = -8;
	}else if (Input.GetKey (KeyCode.RightArrow)) {
		GetComponent.<Rigidbody>().velocity.x = 8;
	}else {
		GetComponent.<Rigidbody>().velocity.x = 0;
	}

	if (Input.acceleration.x > 8) {
		GetComponent.<Rigidbody>().velocity.x = 8;
	}else if (Input.acceleration.x < -8) {
		GetComponent.<Rigidbody>().velocity.x = -8;
	}else {
		GetComponent.<Rigidbody>().velocity.x = Input.acceleration.x;
	}
}