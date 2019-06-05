sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller,History) {
	"use strict";

	return Controller.extend("com.controller.WaterQuality", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.view.WaterQuality
		 */
		onInit: function () {

		},
			onPressBack: function () {
			var that = this;
		
				var sPreviousHash = History.getInstance().getPreviousHash();
			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getOwnerComponent().getRouter().navTo("Tile");
			}

		},
				onpHOutput  : function () {
			var pHOutput = sap.ui.getCore().pHOutput;
			this.getView().byId("idTDSText").setText("");
			// this.getView().byId("idpHText").setText(pHOutput);
			this.getOwnerComponent().getRouter().navTo("pHOutput");
			// var oProperty = "DeviceData.pHInput";
			var oProperty = "Device_IoT_1000020.pH_Output";
			this.getOwnerComponent().getRouter().navTo("pHOutput", {
               
				navFrom: "measuredValues",
				headerTitle: " ",
				subHeaderTitle: " ",
				mpPath: oProperty
			});

		},
				onTDSOutput: function () {
				
			var oProperty = "Device_IoT_1000020.TDS_Output";
		    this.getOwnerComponent().getRouter().navTo("TDSOutput", {

				navFrom: "measuredValues",
				headerTitle: " ",
				subHeaderTitle: " ",
				mpPath: oProperty
			});
		},
		onTDSInput: function(){
				var oProperty = "Device_IoT_1000020.TDS_Input";
		    this.getOwnerComponent().getRouter().navTo("TDSInput", {

				navFrom: "measuredValues",
				headerTitle: " ",
				subHeaderTitle: " ",
				mpPath: oProperty
			});
		},
		onpHInput:function(){
			// var pHInput =sap.ui.getCore().pHInput;
			// this.getView().byId("idTDSText").setText("");
			// this.getView().byId("idpHText").setText(pHOutput);
			// this.getOwnerComponent().getRouter().navTo("pHInput");
            var oProperty = "Device_IoT_1000020.pH_Input";
			this.getOwnerComponent().getRouter().navTo("pHInput", {
               
				navFrom: "measuredValues",
				headerTitle: " ",
				subHeaderTitle: " ",
				mpPath: oProperty
			});
		}
		

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.view.WaterQuality
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.view.WaterQuality
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.view.WaterQuality
		 */
		//	onExit: function() {
		//
		//	}

	});

});