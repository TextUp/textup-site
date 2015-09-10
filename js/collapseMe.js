// From http://www.bootply.com/voCGmhNjq6#

;(function($, window, document, undefined) {
    "use strict";

    var pluginName = "collapseMe"
    
    /*
    JQuery proxy statements
     */
    
    $.fn.collapseMe = function(opts) {
        var $this = $(this); 

        if (typeof opts === "string" && opts === "clearDropdownAndRebuild") {
            var collapseMeObj = $this.data(pluginName);
            if (collapseMeObj) {
                var collapse = collapseMeObj.selector; 
                $(collapse).empty();
                $this.trigger("resize"); 
            }
        } else {
            var defaults = {
                    selector: "#collapsed" //dropdown
                },
                settings = $.extend(defaults, opts);

            $this.each(function() {
                var $this = $(this),
                    collapseMe = $this.data(pluginName);

                //can"t call this initializer more than once
                if (!collapseMe) {
                    new CollapseMe(this, settings);
                    $this.data(pluginName, settings);
                }
            });
            return $this;
        }
    };
    $.fn.collapseMe.Constructor = CollapseMe; 



    /*
    Constructor
     */
    
    var CollapseMe = function(element, settings) {
        //adding the required styles to the element
        // var sheet = createNewStylesheet(); 
        // var selector = getSelector(element); 
        // addCSSRule(sheet, selector, "white-space:nowrap;");
        // var childLiSelector = selector + " > li";
        // addCSSRule(sheet, childLiSelector, "white-space:nowrap;");
        // addCSSRule(sheet, childLiSelector, "position: relative;");
        // addCSSRule(sheet, childLiSelector, "display: inline-block !important;");
        // addCSSRule(sheet, childLiSelector, "float:none;");

        //starting the refresh process
        var self = this;
        var selector = settings.selector; 
        $(window).on("resize", function() {
            self.refresh(element, selector); 
        }); 
        this.refresh(element, selector);
    }

    /*
    CollapseMe prototype methods (so we don"t pollute the JQuery namespace)
     */
    
    CollapseMe.prototype = {
        constructor:CollapseMe, 
        refresh:function(element, selector) {
            var collapse = $(selector);
            var parent = $(element).parent();
            if (hasOverflow(parent)) { shrink(element, collapse); }
            else { grow(element, collapse); }
        }
    }

    /*
    * Helper methods
    */

    function shrink(element, collapse) {
        var $this = $(element);
        var parent = $this.parent();
        var i = 0; 
        while(hasOverflow(parent)) {
            var children = $this.children("li:not(:last-child)");
            var count = children.size();
            if (count <= 1) { return; }
            $(children[count - 1]).prependTo($(collapse));

            //prevent infinite loops
            if (i > 100) { break; }
            i++
        }
    }

    function grow(element, collapse) {
        var $this = $(element);
        var parent = $this.parent();
        var shouldShrinkAfterwards = false;
        var i = 0;
        while(!hasOverflow(parent) && ($this.children("li").size() > 0)) {
            var collapsed = $(collapse).children("li");
            var count = collapsed.size();
            if (count > 0) {
                $(collapsed[0]).insertBefore($this.children("li:last-child"));
            }
            //if we grew by too much, we will 
            //take back this child
            if (hasOverflow(parent)) {
                shouldShrinkAfterwards = true; 
                break;
            }

            //prevent infinite loops
            if (i > 100) { break; }
            i++
        }
        if (shouldShrinkAfterwards) { shrink(element, collapse) }
    }

    function hasOverflow(parent) {
        var list = $(parent)[0];
        var hasScrollBar = false; 
        if ((list.offsetHeight < list.scrollHeight) || (list.offsetWidth <= list.scrollWidth)) {
            hasScrollBar = true;
        }
        return hasScrollBar;
    }

    /*
    CSS building helper methods
    From http://davidwalsh.name/add-rules-stylesheets
     */
    
    function createNewStylesheet() {
        // Create the <style> tag
        var style = document.createElement("style");
        // WebKit hack :(
        style.appendChild(document.createTextNode(""));
        // Add the <style> element to the page
        document.head.appendChild(style);

        return style.sheet;
    }

    function getSelector(element) {
        var $this = $(element); 
        //best selector is the id selector
        var id = $this.attr("id");
        if (id) { 
            return "#" + id;
        }
        //otherwise get class selectors
        var classes = $this.attr("classes");
        if (classes) {
            return "." + $.trim(classNames).replace(/\s/gi, ".");
        }
        // last resort use the tagName as a selector
        return $this.tagName;
    }
    
    function addCSSRule(sheet, selector, rules, index) {
        if ("insertRule" in sheet) {
            sheet.insertRule(selector + "{" + rules + "}", index);
        }
        else if ("addRule" in sheet) {
            sheet.addRule(selector, rules, index);
        }
    }

}(jQuery, window, document));