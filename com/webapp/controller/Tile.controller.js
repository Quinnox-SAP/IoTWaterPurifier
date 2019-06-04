sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.controller.Tile", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.view.Tile
		 */
		onInit: function () {
			this.result = {};
			this.result.items = [];

			this.odataService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZQNX_IOT_SRV/", true);
			// this.odataService = this.getView().getModel("ZQNX");
			this.custId = "";
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("Tile").attachMatched(this._onObjectMatched, this);

		},

		_onObjectMatched: function (oEvent) {
			var that = this;
			var mobNum = oEvent.getParameter("arguments").mobileNum;
			this.odataService.read("/CustomerSet('" + mobNum + "')", null, null, false, function (
				response) {
				if (response.ValidPhoneNo === "Success") {
					that.getOwnerComponent().getModel("oCustomer").setData(response);
					//sap.ui.getCore().custId = response.BusinessPartner;
					that.custId = response.BusinessPartner;
					that.getOwnerComponent().getModel("oCustomer").refresh(true);
					// that.getOwnerComponent().getRouter().navTo("RouteHome");
				} else {

					MessageBox.error("Enter a valid phone number");
					that.getView().byId("idnum").setValue("");
				}
				that.getOwnerComponent().getModel("oCustomer").refresh(true);
			});
			var waterConsumption = sap.ui.getCore().waterConsumption;
			this.getView().byId("id1").setValue(waterConsumption);

			//FilterType
			// var filterType = sap.ui.getCore().filterType;
			//   this.getView().byId("id2").setText(filterType);

			//FilterLife
			var filterLife = sap.ui.getCore().filterLife;
			this.getView().byId("id3").setValue(filterLife);
		},

		// _onRouteMatched: function () {
		// 	var that = this;

		// 	// this.odataService.read("/CustomerSet('" + sap.ui.getCore().CustMobNo + "')", null, null, false, function (
		// 	// 	response) {
		// 	// 	if (response.ValidPhoneNo === "Success") {
		// 	// 		that.getOwnerComponent().getModel("oCustomer").setData(response);
		// 	// 		sap.ui.getCore().custId = response.BusinessPartner;
		// 	// 		that.getOwnerComponent().getModel("oCustomer").refresh(true);
		// 	// 	}
		// 	// });

		// 	var waterConsumption = sap.ui.getCore().waterConsumption;
		// 	this.getView().byId("id1").setValue(waterConsumption);

		// 	//FilterType
		// 	// var filterType = sap.ui.getCore().filterType;
		// 	//   this.getView().byId("id2").setText(filterType);

		// 	//FilterLife
		// 	var filterLife = sap.ui.getCore().filterLife;
		// 	this.getView().byId("id3").setValue(filterLife);
		// },
		// onAfterRendering: function () {

		// 	//WaterConsumption
		// 	var waterConsumption = sap.ui.getCore().waterConsumption;
		// 	this.getView().byId("id1").setValue(waterConsumption);

		// 	//FilterType
		// 		// var filterType = sap.ui.getCore().filterType;
		// 	 //   this.getView().byId("id2").setText(filterType);

		// 	//FilterLife
		// 	var filterLife = sap.ui.getCore().filterLife;
		// 	this.getView().byId("id3").setValue(filterLife);
		// },
		onWaterQualityPress: function () {

			var that = this;

			that.getOwnerComponent().getRouter().navTo("WaterQuality");
		},
		onFilterLifePress: function (evt) {
			// var filterCapacity = 10000;
			// var waterFiltered = 2500;
			// var filterConsumed = ((waterFiltered / filterCapacity) * 100);
			// console.log(filterConsumed);
			// sap.ui.getCore().filterConsumed = ((sap.ui.getCore().waterConsumption / sap.ui.getCore().filterLife) * 100);
			// sap.ui.getCore().filterConsumed = Math.round(sap.ui.getCore().filterConsumed);
			var filterConsumed = ((sap.ui.getCore().waterFiltered / sap.ui.getCore().filterLife) * 100);
			filterConsumed = Math.round(filterConsumed);
			var that = this;
			that.getOwnerComponent().getRouter().navTo("FilterLife", {
				FilterConsumed: filterConsumed,
			});
			//this.getOwnerComponent().getRouter().navTo("FilterLife");
		},
		onServiceHistoryPress: function () {
			var that = this;
			that.getOwnerComponent().getRouter().navTo("ServiceHistory", {
				customerID: that.custId,
			});
			// var that = this;

			// this.odataService.read("/ServiceHistorySet?$filter=CustomerID eq '" + sap.ui.getCore().custId + "'", null, null, false, function (
			// 	response) {

			// 	that.getOwnerComponent().getModel("oserviceHistory").setData(response);
			// 	that.getOwnerComponent().getModel("oserviceHistory").refresh(true);
			// 	that.getOwnerComponent().getRouter().navTo("ServiceHistory");

			// });
		},
		onServiceRequestPress: function () {
			this.getOwnerComponent().getRouter().navTo("RouteServiceRequestCreation");
		},
		onPressBack: function () {
			var that = this;
			that.getView().byId("id1").setValue("");
			that.getView().byId("id3").setValue("");
			that.getOwnerComponent().getRouter().navTo("RootView");

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.view.Tile
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.view.Tile
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.view.Tile
		 */
		//	onExit: function() {
		//
		//	}

	});

});