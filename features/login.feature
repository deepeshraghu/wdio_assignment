Feature: Login functionality

  Background:
    Given the app is restarted
    And I am on the catalog screen
    When I navigate to the login screen

  Scenario: Login with valid credentials
    When I login with valid credentials
    Then I should see the checkout address screen
    And I logout


#  Scenario: Show error when no username is provided
#    When I login without username
#    Then I should see the error message "Username is required" for username
#
#  Scenario: Show error when no password is provided
#    When I login without password
#    Then I should see the error message "Password is required" for password
##
#  Scenario: Show error for invalid credentials
#    When I login with invalid credentials
#    Then I should see the error message "Provided credentials do not match any user in this service."
#
#  Scenario: Show error for locked out user
#    When I login with locked out credentials
#    Then I should see the error message "Sorry, this user has been locked out."
