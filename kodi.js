preferences {
	section("Choose one or more, when..."){
		input "motion", "capability.motionSensor", title: "Motion Here", required: false, multiple: true
		input "contactOpen", "capability.contactSensor", title: "Contact Opens", required: false, multiple: true
		input "contactClosed", "capability.contactSensor", title: "Contact Closes", required: false, multiple: true
		input "acceleration", "capability.accelerationSensor", title: "Acceleration Detected", required: false, multiple: true
		input "mySwitchOn", "capability.switch", title: "Switch Turned On", required: false, multiple: true
		input "mySwitchOff", "capability.switch", title: "Switch Turned Off", required: false, multiple: true
		input "arrivalPresence", "capability.presenceSensor", title: "Arrival Of", required: false, multiple: true
		input "departurePresence", "capability.presenceSensor", title: "Departure Of", required: false, multiple: true
		input "smoke", "capability.smokeDetector", title: "Smoke Detected", required: false, multiple: true
		input "water", "capability.waterSensor", title: "Water Sensor Wet", required: false, multiple: true
		input "locksLocked", "capability.lock", title: "Lock Locked?",  required: false, multiple:true
        input "locksUnlocked", "capability.lock", title: "Lock Unlock?",  required: false, multiple:true


	}

    section("Run when SmartThings is set to") {
		input "setMode", "mode", title: "Mode?",  required: false, multiple:true
	}

    section("kodi Notifications LivingRoom:") {
    input "kodiserver", "text", title: "kodi IP", description: "IP Address", required: false
    input "kodiport", "number", title: "kodi Port", description: "Port", required: false
    }

    section("kodi Notifications Bedroom:") {
    input "kodiserver2", "text", title: "kodi IP", description: "IP Address", required: false
    input "kodiport2", "number", title: "kodi Port", description: "Port", required: false
    }

}

def installed() {
	log.debug "Installed with settings: ${settings}"
	subscribeToEvents()
}

def updated() {
	log.debug "Updated with settings: ${settings}"
	unsubscribe()
	subscribeToEvents()
}

def subscribeToEvents() {
	subscribe(contactOpen, "contact.open", eventHandler)
	subscribe(contactClosed, "contact.closed", eventHandler)
	subscribe(acceleration, "acceleration.active", eventHandler)
    subscribe(Noacceleration, "acceleration.inactive", eventHandler)
	subscribe(motion, "motion.active", eventHandler)
    subscribe(Nomotion, "motion.inactive", eventHandler)
	subscribe(mySwitchOn, "switch.on", eventHandler)
	subscribe(mySwitchOff, "switch.off", eventHandler)
	subscribe(arrivalPresence, "presence.present", eventHandler)
	subscribe(departurePresence, "presence.not present", eventHandler)
	subscribe(smoke, "smoke.detected", eventHandler)
	subscribe(smoke, "smoke.tested", eventHandler)
	subscribe(smoke, "carbonMonoxide.detected", eventHandler)
	subscribe(water, "water.wet", eventHandler)
    subscribe(locksLocked, "lock.locked", eventHandler)
    subscribe(locksUnlocked, "lock.unlocked", eventHandler)
    subscribe(location, modeChangeHandler)

}

def eventHandler(evt) {
	sendmessage(evt)
    sendmessage1(evt)

}

def sendmessage(evt) {
        def lanaddress = "${settings.kodiserver}:${settings.kodiport}"
        def deviceNetworkId = "1234"
        def toReplace = evt.displayName
		def replaced = toReplace.replaceAll(' ', '%20')
        def name = replaced
    	def value = evt.value
        def json = new JsonBuilder()
        json.call("jsonrpc":"2.0","method":"GUI.ShowNotification","params":[title: "${name}",message: "${value}",image: "${img}"],"id":1)
        def kodimessage = "/jsonrpc?request="+json.toString()
        def result = new physicalgraph.device.HubAction("""GET $kodimessage HTTP/1.1\r\nHOST: $lanaddress\r\n\r\n""", physicalgraph.device.Protocol.LAN, "${deviceNetworkId}")
        sendHubCommand(result)
        log.debug(result)
}

def sendmessage1(evt) {
        def lanaddress = "${settings.kodiserver2}:${settings.kodiport2}"
        def deviceNetworkId = "1234"
        def toReplace = evt.displayName
		def replaced = toReplace.replaceAll(' ', '%20')
        def name = replaced
        def value = evt.value
        def json = new JsonBuilder()
        json.call("jsonrpc":"2.0","method":"GUI.ShowNotification","params":[title: "${name}",message: "${value}",image: "${img}"],"id":1)
        def kodimessage = "/jsonrpc?request="+json.toString()
        def result = new physicalgraph.device.HubAction("""GET $kodimessage HTTP/1.1\r\nHOST: $lanaddress\r\n\r\n""", physicalgraph.device.Protocol.LAN, "${deviceNetworkId}")
        sendHubCommand(result)

}
def modeChangeHandler(evt) {
	sendmessage3(evt)
    sendmessage4(evt)

}

def sendmessage3(evt) {
        def lanaddress = "${settings.kodiserver}:${settings.kodiport}"
        def deviceNetworkId = "1234"
        def mode = evt.value
        def msg = "Mode%20Activated"
        def json = new JsonBuilder()
        json.call("jsonrpc":"2.0","method":"GUI.ShowNotification","params":[title: "${mode}",message: "${msg}",image: "${img}"],"id":1)
        def kodimessage = "/jsonrpc?request="+json.toString()
        def result = new physicalgraph.device.HubAction("""GET $kodimessage HTTP/1.1\r\nHOST: $lanaddress\r\n\r\n""", physicalgraph.device.Protocol.LAN, "${deviceNetworkId}")
        sendHubCommand(result)
}

def sendmessage4(evt) {
        def lanaddress = "${settings.kodiserver2}:${settings.kodiport2}"
        def deviceNetworkId = "1234"
        def mode = evt.value
        def msg = "Mode%20Activated"
        def json = new JsonBuilder()
        json.call("jsonrpc":"2.0","method":"GUI.ShowNotification","params":[title: "${mode}",message: "${msg}",image: "${img}"],"id":1)
        def kodimessage = "/jsonrpc?request="+json.toString()
        def result = new physicalgraph.device.HubAction("""GET $kodimessage HTTP/1.1\r\nHOST: $lanaddress\r\n\r\n""", physicalgraph.device.Protocol.LAN, "${deviceNetworkId}")
        sendHubCommand(result)

}
