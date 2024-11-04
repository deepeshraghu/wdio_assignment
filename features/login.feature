Feature: Login functionality
  # This feature file covers the login functionality of the application, including
  # successful login, error handling for missing or invalid credentials, and logout.

  Background:
    # Background steps to be run before each scenario to set up initial conditions.
    Given the app is restarted
    # Ensures the app is restarted and in a clean state before starting a test.

    And I am on the catalog screen
    # Verifies that the user is on the catalog screen.

    When I navigate to the login screen
    # Navigates to the login screen using a deep link.

  Scenario: Login with valid credentials
    # This scenario verifies a successful login with valid credentials.
    When I login with valid credentials
    # Performs login using a valid, predefined user account.

    Then I should see the checkout address screen
    # Verifies that the checkout address screen is displayed after a successful login.

    And I logout
    # Logs out from the application after verifying successful login.

  Scenario Outline: Show error for missing or invalid credentials
    # This scenario outline verifies error messages for various cases of invalid login.

    When I login with <username> and <password>
    # Attempts to log in with specific <username> and <password> values from the examples table.

    Then I should see the error message "<errorMessage>" for "<errotype>"
    # Verifies that the displayed error message matches the expected <errorMessage>.

    Examples:
      | username         | password       | errorMessage                                                      | errotype        |
      | NO_USER_DETAILS  | validPass      | Username is required                                              |     username    |
      # Checks error when no username is provided.

      | validUser        | NO_PASSWORD    | Password is required                                              |     password    |
      # Checks error when no password is provided.

      | invalidUser      | invalidPass    | Provided credentials do not match any user in this service.       |    generic      |
      # Checks error when an invalid username and password are provided.

      | lockedUser       | validPass      | Sorry, this user has been locked out.                             |     generic     |
      # Checks error when a locked user attempts to log in.
