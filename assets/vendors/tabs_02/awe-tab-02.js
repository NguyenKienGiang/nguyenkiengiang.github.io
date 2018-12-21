/// <reference path="../../../ts-libraries/jquery.d.ts" />
var AweTabs_02 = (function () {
    function AweTabs_02(el, options) {
        this.$el = (el instanceof HTMLElement) ? jQuery(el) : el;
        this.options = jQuery.extend(true, {}, AweTabs_02.defaultOptions, options);
        this.validate();
        this.initialize();
    }
    AweTabs_02.prototype.validate = function () {
        if(!this.$el.hasClass('ac-tab__nav'))
            this.$el.addClass('ac-tab__nav');
        if (jQuery('li a', this.$el).length === 0)
            throw Error('Could not find any tab\'s navigator element. Please put class "ac-tab__nav-item" to li element of tab\'s navigator.');
        if (jQuery('.ac-tab__panel').length === 0)
            throw Error('Could not find any tab panel elements. Please put class "ac-tab__panel" to wrapper element of tab\'s panel.');
        var _self = this;
        jQuery('li a', this.$el).each(function () {
            var tabId = jQuery(this).attr('href'), $tabPanel = jQuery(tabId);
            if ($tabPanel.length !== 1)
                throw Error("Have " + $tabPanel.length + " elements which have id=\"" + tabId + "\".");
        });
    };
    AweTabs_02.prototype.initialize = function () {
        jQuery('li a', this.$el).removeClass("active");
        this.events();        
        if (this.options.active !== false) {
            var fireEvent = this.options.activeEvent === 'hover' ? 'mouseenter' : "click";
            jQuery("li:eq(" + this.options.active + ") a", this.$el).trigger(fireEvent);
        }
    };
    AweTabs_02.prototype.events = function () {
        var _self = this, options = this.options, fireEvent = options.activeEvent === 'hover' ? 'mouseenter' : "click";
        this.$el.delegate('li a', fireEvent, function (event) {
            event.preventDefault();
            var tabID = jQuery(this).attr('href');
            if (options.collapsible)
                jQuery(tabID).toggle();
            else if (!jQuery(this).parent().hasClass('active')) {
                var $activatedTab = jQuery('li.active a', _self.$el), $activatedPanel = jQuery($activatedTab.attr('href'));
                $activatedTab.parent().removeClass('active ac-active');
                $activatedPanel.hide();
                jQuery(jQuery(this).attr('href')).show();
                jQuery(this).parent().addClass("active ac-active");
            }
        });
    };
    AweTabs_02.defaultOptions = {
        active: 0,
        collapsible: false,
        heightStyle: 'content',
        activeEvent: 'click',
        navigatorPosition: 'top'
    };
    return AweTabs_02;
}());
jQuery.fn.aweTabs_02 = function (options) {
    jQuery.each(this, function () {
        if (options == undefined) {
            options = JSON.parse(jQuery(this).attr('data-tabs'));
        }
        var tabs = new AweTabs_02(this, options);
        jQuery(this).data('awe-tabs', tabs);
        //refresh options in loop when length > 1
        options = undefined;
    });
    return this;
};
