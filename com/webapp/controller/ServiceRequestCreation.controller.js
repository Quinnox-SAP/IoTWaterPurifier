sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History"
], function (Controller, MessageBox, History) {
	"use strict";

	return Controller.extend("com.controller.ServiceRequestCreation", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.view.ServiceRequestCreation
		 */
		onInit: function () {
			this.result = {};
			this.result.items = [];

			this.odataService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZQNX_IOT_SRV/", true);
		},

		onSubmitDialog: function () {
			var that = this;
			var issue = this.getView().byId("issue").getValue();
			var comments = this.getView().byId("comments").getValue();
			if ((issue !== "") && (comments !== "")) {
				var data = {};
				data.Issue = issue;
				data.Comment = comments;
				data.CustomerID = sap.ui.getCore().custId;
				this.odataService.create("/ServiceRequestSet", data, null, function (odata, response) {
						var msg = "Service Request " + response.data.ServiceNumber + " Created Sucessfully";
						that.getView().byId("issue").setValue("");
						that.getView().byId("comments").setValue("");
						MessageBox.success(msg);
						that.getOwnerComponent().getRouter().navTo("RouteHome");
					},
					function (odata, response) {

					}
				);
			} else {
				MessageBox.information("Please enter all mandatory fields");
			}

		},
		onNavBack: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();
			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("Tile");
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.view.ServiceRequestCreation
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.view.ServiceRequestCreation
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.view.ServiceRequestCreation
		 */
		//	onExit: function() {
		//
		//	}

	});

});