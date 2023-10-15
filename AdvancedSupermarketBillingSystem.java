import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

class Product {
    private String name;
    private double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }
}

class ShoppingCart {
    private Map<Product, Integer> items = new HashMap<>();

    public void addItem(Product product, int quantity) {
        items.put(product, quantity);
    }

    public double calculateTotal() {
        double total = 0;
        for (Map.Entry<Product, Integer> entry : items.entrySet()) {
            Product product = entry.getKey();
            int quantity = entry.getValue();
            total += product.getPrice() * quantity;
        }
        return total;
    }

    public void displayBill(String customerName) {
        System.out.println("------- Your Bill -------");
        System.out.println("Customer: " + customerName);
        for (Map.Entry<Product, Integer> entry : items.entrySet()) {
            Product product = entry.getKey();
            int quantity = entry.getValue();
            System.out.println(product.getName() + " x " + quantity + " = Rs." + product.getPrice() * quantity);
        }
        double total = calculateTotal();
        System.out.println("-------------------------");
        System.out.println("Total: Rs." + total);

        // Apply discount based on total amount spent
        double discount = calculateDiscount(total);
        System.out.println("Discount: Rs." + discount);

        // Calculate the final amount after discount
        double finalAmount = total - discount;
        System.out.println("Final Amount: Rs." + finalAmount);

        // Save the transaction details to a file
        saveReceipt(customerName, total, discount, finalAmount);
    }

    private double calculateDiscount(double total) {
        // Apply a 10% discount if the total amount is greater than Rs.50
        return total > 50 ? 0.1 * total : 0;
    }

    private void saveReceipt(String customerName, double total, double discount, double finalAmount) {
        try (FileWriter writer = new FileWriter("receipt.txt")) {
            writer.write("Customer: " + customerName + "\n");
            writer.write("------- Your Receipt -------\n");
            for (Map.Entry<Product, Integer> entry : items.entrySet()) {
                Product product = entry.getKey();
                int quantity = entry.getValue();
                writer.write(product.getName() + " x " + quantity + " = Rs." + product.getPrice() * quantity + "\n");
            }
            writer.write("Total: Rs." + total + "\n");
            writer.write("Discount: Rs." + discount + "\n");
            writer.write("Final Amount: Rs." + finalAmount + "\n");
            writer.write("-----------------------------\n");
            System.out.println("Receipt saved to receipt.txt");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
public class AdvancedSupermarketBillingSystem {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Creating more sample products
        Product apple = new Product("Apple", 10.0);
        Product banana = new Product("Banana", 5.0);
        Product milk = new Product("Milk", 25.0);
        Product chocolate = new Product("Chocolate", 15.0);
        Product strawberry = new Product("Strawberry", 20.0);
        Product biscuits = new Product("Biscuits", 20.0);
        Product softDrinks = new Product("Soft Drinks", 25.0);
        Product mango = new Product("Mango", 12.0);
        Product spinach = new Product("Spinach", 20.0);
        Product tomato = new Product("Tomato", 5.0);

        // Creating a shopping cart
        ShoppingCart cart = new ShoppingCart();

        // Taking customer information
        System.out.print("Enter your name: ");
        String customerName = scanner.nextLine();

        // Taking user input for items and quantities
        int choice;
        do {
            System.out.println("\nAvailable Products:");
            System.out.println("1. Apple (Rs.10.0)");
            System.out.println("2. Banana (Rs.5.0)");
            System.out.println("3. Milk (Rs.25.0)");
            System.out.println("4. Chocolate (Rs.10.0)");
            System.out.println("5. Strawberry (Rs.15.0)");
            System.out.println("6. Biscuits (Rs.20.0)");
            System.out.println("7. Soft Drinks (Rs.20.0)");
            System.out.println("8. Mango (Rs.20.0)");
            System.out.println("9. Spinach (Rs.15.0)");
            System.out.println("10. Tomato (Rs.5.0)");
            System.out.println("11. Checkout");
            System.out.print("Enter your choice (1-11): ");
            choice = scanner.nextInt();

        switch (choice) {
    case 1:
        System.out.print("Enter quantity for Apple: ");
        int appleQuantity = scanner.nextInt();
        cart.addItem(apple, appleQuantity);
        break;
    case 2:
        System.out.print("Enter quantity for Banana: ");
        int bananaQuantity = scanner.nextInt();
        cart.addItem(banana, bananaQuantity);
        break;
    case 3:
        System.out.print("Enter quantity for Milk: ");
        int milkQuantity = scanner.nextInt();
        cart.addItem(milk, milkQuantity);
        break;
    case 4:
        System.out.print("Enter quantity for Chocolate: ");
        int chocolateQuantity = scanner.nextInt();
        cart.addItem(chocolate, chocolateQuantity);
        break;
    case 5:
        System.out.print("Enter quantity for Strawberry: ");
        int strawberryQuantity = scanner.nextInt();
        cart.addItem(strawberry, strawberryQuantity);
        break;
    case 6:
        System.out.print("Enter quantity for Biscuits: ");
        int biscuitsQuantity = scanner.nextInt();
        cart.addItem(biscuits, biscuitsQuantity);
        break;
    case 7:
        System.out.print("Enter quantity for Soft Drinks: ");
        int softDrinksQuantity = scanner.nextInt();
        cart.addItem(softDrinks, softDrinksQuantity);
        break;
    case 8:
        System.out.print("Enter quantity for Mango: ");
        int mangoQuantity = scanner.nextInt();
        cart.addItem(mango, mangoQuantity);
        break;
    case 9:
        System.out.print("Enter quantity for Spinach: ");
        int spinachQuantity = scanner.nextInt();
        cart.addItem(spinach, spinachQuantity);
        break;
    case 10:
        System.out.print("Enter quantity for Tomato: ");
        int tomatoQuantity = scanner.nextInt();
        cart.addItem(tomato, tomatoQuantity);
        break;
    case 11:
        break;
    default:
        System.out.println("Invalid choice. Please enter a valid option.");
}


        } while (choice != 11);

        // Displaying the bill with discounts and saving the receipt
        cart.displayBill(customerName);
    }
}
