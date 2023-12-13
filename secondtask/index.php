<?php
class Car {
    protected $name; // Making the property protected

    // set the name property in the constructor
    function __construct($name) {
        $this->name = $name;
    }

    function get_name() {
        return $this->name;
    }

    //using dynamic name property in the print_assembly method
    function print_assembly() {
        echo "The {$this->name} Car finishes assembly every Friday at 5pm. \n";
    }
}

class TeslaCar extends Car {
    function generate_assembly_reports() {
        echo "Generating assembly reports...\n";  //using \n to add a new line
        echo "Exporting CSV format reports...\n";
        echo "Printing reports...\n";
    }
}

// Instantiating TeslaCar with a specific model name
$car = new TeslaCar("Model_3");
echo $car->get_name();  // Using the get_name method to get the name property
echo "\n"; // Using \n to add a new line
$car->generate_assembly_reports(); // Using the generate_assembly_reports method
$car->print_assembly(); // Using the print_assembly method
?><?php
