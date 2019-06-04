sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.controller.FilterLife", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.view.FilterLife
		 */
		onInit: function () {
			this.result = {};
			this.result.items = [];

			this.odataService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZQNX_IOT_SRV/", true);

			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("FilterLife").attachMatched(this._onObjectMatched, this);

		},
		_onObjectMatched: function (oEvent) {
			var that = this;
			var filterConsumed = oEvent.getParameter("arguments").FilterConsumed;
		},

		// _onRouteMatched: function () {
		// 	this.getView().byId("idList").setNumber(sap.ui.getCore().filterConsumed);
		// 	//FilterType
		// 	var filterType = sap.ui.getCore().filterType;
		// 	this.getView().byId("id1").setText(filterType);
		// 	//WaterFiltered
		// 	var waterFiltered = sap.ui.getCore().waterFiltered;
		// 	this.getView().byId("id2").setText(waterFiltered);
		// },

		// 		onNavBack: function () {
		// 	window.history.back();
		// 	if (this.getOwnerComponent().isTimedOut) {
		// 		this.getOwnerComponent().showTimeoutMessage();
		// 	}
		// },
		onNavBack: function () {
			var that = this;
			that.getOwnerComponent().getRouter().navTo("Tile");
			// this.getView().byId("id1").setText("");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.view.FilterLife
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.view.FilterLife
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.view.FilterLife
		 */
		//	onExit: function() {
		//
		//	}

	});

});