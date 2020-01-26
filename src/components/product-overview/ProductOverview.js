import React from 'react';

//  Has four sub-units:
//  Image Gallery
//  Product Information
//  Style Selector
//  Add to Cart

const ProductOverview = (props) => (
  <div>
      Product Overview
    {/* Product Main View - Class Component 
      <> STATE:
        [Item]: passed from PRODUCT OVERVIEW in props, from store 
        [ItemStyles]: passed from API call method in constructor.
        [SelectedStyle]: defaults to FIRST style in list.  Changed by Style Selector component
        [SelectedSize]: defaults to "Select Size".  Changed by Add to Cart component
        [SelectedQty]: defaults to 1, max is 15.  Changed by Add to Cart component
        [ImageView]: default or expanded.  If expanded is selected, image view slides out and expands over RIGHT COLUMN


      > State contains the information relevant to all child components
        > This is passed down through props
      > State is passed Item from store by PRODUCT OVERVIEW component 
        > Stores it in state
      > Contains API Call(s) for:
        > Product STYLES - store in state.ItemStyles
      > Contains Handlers for:
        > Style Selector change
        > Add to Cart Size change
        > Add to Cart Qty change
        > Add to Cart button click
        > Image view change
      
    
      * LEFT COLUMN - GRID - Tailwind styled div (expands OVER right column if expanded view is enabled)
        * Image View - Carousel(Gallery) - Functional Component
        > Viewable in Two States (May need to use switcher in Main view to handle):
          # Default View
          # Expanded View
        > Currently Selected Style determines photos (passed from Main View's state)
        > Updates when style Changes (i.e. re-renders when Main View's state is changed)
        > Allow customer to browse between and zoom in on the photos
       
        * Default View
          > Default image is main image
          > Overlaid by 'list' of thumbnail images
            > Could be own component, with BG image being the selected one (as per tutorial)
            > Has up and down arrows to scroll
            > Displays up to 7 images at a time, scrolling if more
            > Should scroll automatically if the image nav'd to by arrows is not on the visible list
          > When switching between styles, the INDEX of the image selected should be maintained when gallery updates 
            > Will probably need to check to see if there are same number of images for this new style
          > Clicking on thumbnail updates main image
          > Thumbnail should be highlighted when selected
          > Selected thumbnail is inert - clicking it will have no effect.
          > Has left and right buttons if main image is not at either end of list 
            > last image has no right, first image has no left, for obvious reasons
          > If user hovers over the image NOT over the thumbnails or arrows, magnifying glass is displayed
            > If user clicks while magnifying glass is displayed, trigger expanded view (handler passed from Main View)
          

        * Expanded View
          > Overlays the rest of the item detail area (i.e. Covers RIGHT COLUMN)
          > Has right and left arrows which function as above
          > The magifying glass is now a + symbol
          > Thumbnails no longer appear (hide this component, or switch its view to the mini-icons, see below)
            > Instead icons indicating each image appear.
              > They are much smaller than the list thumbnails
              > The current image's icon is emphasized/different
          > If user clicks the expanded view, the image is zoomed in 250%
            > This will obviously make it larger than the space provided
          > WHEN IN ZOOMED VIEW MODE (see above)
            > The shown portion of the image is relative to the mouse position on the screen (on the gallery image display area)
              > Moving the mouse left pans left, etc.
              > Moving the mouse up pans up, etc.
              > Pans should be SMOOTH
              > No arrow or thumbnail selection icons are displayed
              > The mouse cursor is a - symbol
                > CLICKING on the image returns to the Expanded View State

      * RIGHT COLUMN - GRID - Tailwind styled div
        * Product information - Functional Component
          > Category ( thru props from Main View state.item) 

          *  Stars/Review - Utility (Functional?) Component 
            > In this case, contains "[5 STARS WIDGET] (Read all __NUM__ Reviews)" on one line

          * Social Media Widget Component
            > May be partially functional - depends on some Auth stuff, user, etc. being established (?)
            > Allows user to share item on the following:
              # FaceBook
              # Twitter
              # Pinterest

        * Style Selector - Functional Component 
          * Style Display Component
            > Makes rows of 4 and renders as:
            * Style Display Item Component / Mapped div variable (both will work)

          > Shows thumbnail of all styles in props.ItemStyles (passed from Main View's state.ItemStyles)
          > Thumbnails are in rows of 4
          > Defaults to FIRST style (can be done in Main View's constructor by defaulting ItemStyles to first)
          > Clicking on a style changes the style in Main View's state - via function passed from Main View
          > A check appears on top of a thumbnail to show it is selected (use a transparency perhaps?)
            > The selected style is inert - clicking on it does nothing.

        * Add to Cart - Functional Component 
          # Size - dropdown 
            > Needs access to Style Selector's selected style 
            > Needs to know sizes available for that style, omit from dropdown those that aren't
            > Consider using a passed function or variable from Main View to represent a matrix table of sizes for style

          # Qty - dropdown
            > Needs to know stock available per style/size
            > Passed in props from Main View

          # Add to Cart - button - conditional behavior - requires function passed down from Main View
            > Size MUST be selected to add to cart 
              > if not, opens size dropdown with message above it ("please select size")
            > If there is NO STOCK for style/size combo, this button is HIDDEN 
              > for extra flair, add message "GET NOTIFIED WHEN BACK IN STOCK" possibly with dummy form/modal that takes email
       
    */}

  </div>
);

export default ProductOverview;
