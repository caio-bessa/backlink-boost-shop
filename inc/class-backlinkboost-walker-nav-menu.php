
<?php
/**
 * Custom nav menu walker for BacklinkBoost theme
 *
 * @package BacklinkBoost
 */

class BacklinkBoost_Walker_Nav_Menu extends Walker_Nav_Menu {
    /**
     * Starts the element output.
     *
     * @param string   $output Used to append additional content (passed by reference).
     * @param WP_Post  $item   Menu item data object.
     * @param int      $depth  Depth of menu item.
     * @param stdClass $args   An object of wp_nav_menu() arguments.
     * @param int      $id     Current item ID.
     */
    public function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
        $indent = ($depth) ? str_repeat("\t", $depth) : '';
        
        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;
        
        // Add active class for current page
        if (in_array('current-menu-item', $classes)) {
            $classes[] = 'active';
        }
        
        // Check if the item has children
        $has_children = in_array('menu-item-has-children', $classes);
        
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args, $depth));
        $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';
        
        $id = apply_filters('nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args, $depth);
        $id = $id ? ' id="' . esc_attr($id) . '"' : '';
        
        $output .= $indent . '<li' . $id . $class_names .'>';
        
        $atts = array();
        $atts['title']  = !empty($item->attr_title) ? $item->attr_title : '';
        $atts['target'] = !empty($item->target) ? $item->target : '';
        $atts['rel']    = !empty($item->xfn) ? $item->xfn : '';
        $atts['href']   = !empty($item->url) ? $item->url : '';
        
        // If this is a dropdown menu
        if ($has_children && $depth === 0) {
            $atts['class'] = 'has-dropdown';
        }
        
        $atts = apply_filters('nav_menu_link_attributes', $atts, $item, $args, $depth);
        
        $attributes = '';
        foreach ($atts as $attr => $value) {
            if (!empty($value)) {
                $value = ('href' === $attr) ? esc_url($value) : esc_attr($value);
                $attributes .= ' ' . $attr . '="' . $value . '"';
            }
        }
        
        $item_output = $args->before;
        $item_output .= '<a'. $attributes .'>';
        
        // Add an icon for menu items
        if ($depth === 0) {
            // Default icon
            $icon = 'fa-circle';
            
            // Check for known keywords in the menu title
            if (strpos(strtolower($item->title), 'dashboard') !== false) {
                $icon = 'fa-tachometer-alt';
            } elseif (strpos(strtolower($item->title), 'result') !== false || strpos(strtolower($item->title), 'campanha') !== false) {
                $icon = 'fa-chart-bar';
            } elseif (strpos(strtolower($item->title), 'financ') !== false) {
                $icon = 'fa-dollar-sign';
            } elseif (strpos(strtolower($item->title), 'link') !== false) {
                $icon = 'fa-link';
            } elseif (strpos(strtolower($item->title), 'conte') !== false) {
                $icon = 'fa-file-text';
            }
            
            $item_output .= '<i class="fa ' . $icon . '"></i> ';
        }
        
        $item_output .= $args->link_before . apply_filters('the_title', $item->title, $item->ID) . $args->link_after;
        
        // Add dropdown icon if needed
        if ($has_children && $depth === 0) {
            $item_output .= ' <i class="fa fa-chevron-down dropdown-icon"></i>';
        }
        
        $item_output .= '</a>';
        $item_output .= $args->after;
        
        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }
    
    /**
     * Starts the list before the elements are added.
     *
     * @param string   $output Used to append additional content (passed by reference).
     * @param int      $depth  Depth of menu item.
     * @param stdClass $args   An object of wp_nav_menu() arguments.
     */
    public function start_lvl(&$output, $depth = 0, $args = array()) {
        $indent = str_repeat("\t", $depth);
        $output .= "\n$indent<ul class=\"sidebar-submenu\">\n";
    }
}
