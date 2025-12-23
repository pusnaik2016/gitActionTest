#!/usr/bin/env python3
"""
Test script to validate the GitHub Actions pipeline
"""

def test_basic_functionality():
    """Test basic Python functionality"""
    assert 1 + 1 == 2, "Basic math test failed"
    print("✓ Basic math test passed")

def test_string_operations():
    """Test string operations"""
    test_string = "GitHub Actions"
    assert test_string.upper() == "GITHUB ACTIONS", "String uppercase test failed"
    assert len(test_string) == 14, "String length test failed"
    print("✓ String operations test passed")

def test_list_operations():
    """Test list operations"""
    test_list = [1, 2, 3, 4, 5]
    assert sum(test_list) == 15, "List sum test failed"
    assert len(test_list) == 5, "List length test failed"
    print("✓ List operations test passed")

def main():
    """Run all tests"""
    print("Starting test suite...")
    print("-" * 40)
    
    test_basic_functionality()
    test_string_operations()
    test_list_operations()
    
    print("-" * 40)
    print("All tests passed successfully! ✓")
    return 0

if __name__ == "__main__":
    exit(main())
